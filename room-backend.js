import { BACKEND_CONFIG } from "./backend-config.js";

const configured = () => Boolean(BACKEND_CONFIG.supabaseUrl && BACKEND_CONFIG.supabasePublishableKey);

export function normalizeInviteCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "");
}

export class RoomBackend {
  #client;
  #user;

  get isConfigured() { return configured(); }
  get user() { return this.#user; }

  async initialize() {
    if (!this.isConfigured) return { configured: false, user: null, profile: null };
    if (!this.#client) {
      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      this.#client = createClient(BACKEND_CONFIG.supabaseUrl, BACKEND_CONFIG.supabasePublishableKey);
    }
    const { data: sessionData, error: sessionError } = await this.#client.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) {
      const { data, error } = await this.#client.auth.signInAnonymously();
      if (error) throw error;
      this.#user = data.user;
    } else {
      const { data, error } = await this.#client.auth.getUser();
      if (error) throw error;
      this.#user = data.user;
    }
    const { data: profile, error: profileError } = await this.#client.from("users").select("id,nickname,created_at").eq("id", this.#user.id).maybeSingle();
    if (profileError) throw profileError;
    return { configured: true, user: this.#user, profile };
  }

  async saveNickname(nickname) {
    const value = String(nickname || "").trim();
    if (!value || value.length > 20) throw new Error("닉네임은 1~20자로 입력해주세요.");
    if (!this.#user) await this.initialize();
    const { error } = await this.#client.from("users").upsert({ id: this.#user.id, nickname: value }, { onConflict: "id" });
    if (error) throw error;
    return value;
  }

  async listRooms() {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client
      .from("room_members")
      .select("joined_at,rooms(id,invite_code,owner_user_id,created_at)")
      .eq("user_id", this.#user.id)
      .order("joined_at", { ascending: false });
    if (error) throw error;
    return data.map((member) => member.rooms).filter(Boolean);
  }

  async createRoom() {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("create_room");
    if (error) throw error;
    return data;
  }

  async joinRoom(inviteCode) {
    if (!this.#user) await this.initialize();
    const code = normalizeInviteCode(inviteCode);
    if (code.length !== 6) throw new Error("초대 코드는 6자리로 입력해주세요.");
    const { data, error } = await this.#client.rpc("join_room_by_code", { p_invite_code: code });
    if (error) throw error;
    return data;
  }

  async ensureDailyQuestion(roomId, date, questionId) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("ensure_room_daily_question", {
      p_room_id: roomId,
      p_date: date,
      p_question_id: questionId,
    });
    if (error) throw error;
    return data;
  }

  async memberDailyStatus(roomId, date) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("room_member_daily_status", { p_room_id: roomId, p_date: date });
    if (error) throw error;
    return data;
  }

  async listRoomAnswers(roomId, date) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client
      .from("room_answers")
      .select("user_id,question_id,answer,created_at")
      .eq("room_id", roomId)
      .eq("date", date)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  }

  async submitRoomAnswer({ roomId, date, questionId, answer }) {
    if (!this.#user) await this.initialize();
    const value = String(answer || "").trim();
    if (!value || value.length > 140) throw new Error("답변은 1~140자로 입력해주세요.");
    const { data, error } = await this.#client
      .from("room_answers")
      .insert({ room_id: roomId, date, user_id: this.#user.id, question_id: questionId, answer: value })
      .select("user_id,question_id,answer,created_at")
      .single();
    if (error) {
      if (error.code === "23505") throw new Error("오늘은 이미 답변을 남겼어요.");
      throw error;
    }
    return data;
  }

  async claimDailyFragment({ date, source }) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("claim_daily_fragment", { p_date: date, p_source: source });
    if (error) throw error;
    return data;
  }

  async listFragmentEventsFromExistingSession() {
    if (!this.isConfigured) return null;
    if (!this.#client) {
      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      this.#client = createClient(BACKEND_CONFIG.supabaseUrl, BACKEND_CONFIG.supabasePublishableKey);
    }
    const { data: sessionData, error: sessionError } = await this.#client.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) return null;
    this.#user = sessionData.session.user;
    const { data, error } = await this.#client
      .from("fragment_events")
      .select("id,date,source,fragment_index,pet_id,consumed_at,growth_result,created_at")
      .order("date", { ascending: false });
    if (error) throw error;
    return data;
  }

  async getFragmentEvent(fragmentId) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client
      .from("fragment_events")
      .select("id,date,source,fragment_index,pet_id,consumed_at,growth_result,created_at")
      .eq("id", fragmentId)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async getPetStateFromExistingSession({ species, variant }) {
    if (!this.isConfigured) return null;
    if (!this.#client) {
      const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      this.#client = createClient(BACKEND_CONFIG.supabaseUrl, BACKEND_CONFIG.supabasePublishableKey);
    }
    const { data: sessionData, error: sessionError } = await this.#client.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData.session) return null;
    this.#user = sessionData.session.user;
    const { data, error } = await this.#client
      .from("pets")
      .select("id,species,variant,growth_stage,growth_points,growth_scale,traits")
      .eq("species", species)
      .eq("variant", variant)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async ensureActivePet({ species, variant }) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("ensure_active_pet", { p_species: species, p_variant: variant });
    if (error) throw error;
    return Array.isArray(data) ? data[0] : data;
  }

  async consumeDailyFragment({ fragmentId, petId }) {
    if (!this.#user) await this.initialize();
    const { data, error } = await this.#client.rpc("consume_daily_fragment", { p_fragment_id: fragmentId, p_pet_id: petId });
    if (error) throw error;
    return Array.isArray(data) ? data[0] : data;
  }
}

export const roomBackend = new RoomBackend();

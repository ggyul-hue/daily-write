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
}

export const roomBackend = new RoomBackend();

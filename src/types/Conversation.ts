export type Conversation = {
  title: string;
  create_time: number;
  update_time: number;
  mapping: { [key: string]: Node };
  moderation_results: any[];
  current_node: string;
  plugin_ids: null | any[];
  conversation_id: string;
  conversation_template_id: null | string;
  gizmo_id: null | string;
  is_archived: boolean;
  safe_urls: any[];
  id: string;
};

export type Node = {
  id: string;
  message: Message | null;
  parent: string | null;
  children: string[];
};

type Message = {
  id: string;
  author: Author;
  create_time: number | null;
  update_time: number | null;
  content: Content;
  status: string;
  end_turn: boolean | null;
  weight: number;
  metadata: Metadata;
  recipient: string;
};

type Author = {
  role: string;
  name: string | null;
  metadata: any;
};

type Content = {
  content_type: string;
  parts: string[];
};

type Metadata = {
  [key: string]: any;
};

// Representing an array of Conversation objects
export type Conversations = Conversation[];

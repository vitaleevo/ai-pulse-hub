export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          article_id: string | null
          created_at: string
          id: string
          position: string | null
          referrer: string | null
          tool_id: string | null
        }
        Insert: {
          article_id?: string | null
          created_at?: string
          id?: string
          position?: string | null
          referrer?: string | null
          tool_id?: string | null
        }
        Update: {
          article_id?: string | null
          created_at?: string
          id?: string
          position?: string | null
          referrer?: string | null
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliate_clicks_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          featured: boolean
          id: string
          meta_description: string | null
          og_image: string | null
          published_at: string | null
          reading_time: number | null
          seo_title: string | null
          slug: string
          sponsored: boolean
          status: Database["public"]["Enums"]["article_status"]
          tags: string[]
          title: string
          type: Database["public"]["Enums"]["article_type"]
          updated_at: string
          view_count: number
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          seo_title?: string | null
          slug: string
          sponsored?: boolean
          status?: Database["public"]["Enums"]["article_status"]
          tags?: string[]
          title: string
          type?: Database["public"]["Enums"]["article_type"]
          updated_at?: string
          view_count?: number
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          id?: string
          meta_description?: string | null
          og_image?: string | null
          published_at?: string | null
          reading_time?: number | null
          seo_title?: string | null
          slug?: string
          sponsored?: boolean
          status?: Database["public"]["Enums"]["article_status"]
          tags?: string[]
          title?: string
          type?: Database["public"]["Enums"]["article_type"]
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          order: number
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order?: number
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order?: number
          slug?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          confirmed_at: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          source: string | null
          status: Database["public"]["Enums"]["subscriber_status"]
          tags: string[]
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["subscriber_status"]
          tags?: string[]
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["subscriber_status"]
          tags?: string[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      tools: {
        Row: {
          affiliate_enabled: boolean
          affiliate_network: string | null
          affiliate_url: string | null
          badge: Database["public"]["Enums"]["tool_badge"] | null
          category_id: string | null
          cons: string[]
          created_at: string
          cta_text: string | null
          featured: boolean
          id: string
          logo: string | null
          long_desc: string | null
          name: string
          pricing_model: Database["public"]["Enums"]["pricing_model"]
          pros: string[]
          published_at: string | null
          score_overall: number | null
          screenshots: string[]
          short_desc: string
          slug: string
          starting_price: number | null
          tags: string[]
          updated_at: string
          website: string
        }
        Insert: {
          affiliate_enabled?: boolean
          affiliate_network?: string | null
          affiliate_url?: string | null
          badge?: Database["public"]["Enums"]["tool_badge"] | null
          category_id?: string | null
          cons?: string[]
          created_at?: string
          cta_text?: string | null
          featured?: boolean
          id?: string
          logo?: string | null
          long_desc?: string | null
          name: string
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          pros?: string[]
          published_at?: string | null
          score_overall?: number | null
          screenshots?: string[]
          short_desc: string
          slug: string
          starting_price?: number | null
          tags?: string[]
          updated_at?: string
          website: string
        }
        Update: {
          affiliate_enabled?: boolean
          affiliate_network?: string | null
          affiliate_url?: string | null
          badge?: Database["public"]["Enums"]["tool_badge"] | null
          category_id?: string | null
          cons?: string[]
          created_at?: string
          cta_text?: string | null
          featured?: boolean
          id?: string
          logo?: string | null
          long_desc?: string | null
          name?: string
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          pros?: string[]
          published_at?: string | null
          score_overall?: number | null
          screenshots?: string[]
          short_desc?: string
          slug?: string
          starting_price?: number | null
          tags?: string[]
          updated_at?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "tools_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "reader"
      article_status: "draft" | "review" | "published" | "archived"
      article_type:
        | "news"
        | "deep_dive"
        | "tutorial"
        | "comparison"
        | "review"
        | "roundup"
      pricing_model: "free" | "freemium" | "paid" | "enterprise" | "open_source"
      subscriber_status: "pending" | "confirmed" | "unsubscribed"
      tool_badge: "editors_choice" | "trending" | "new" | "deal" | "top_rated"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "reader"],
      article_status: ["draft", "review", "published", "archived"],
      article_type: [
        "news",
        "deep_dive",
        "tutorial",
        "comparison",
        "review",
        "roundup",
      ],
      pricing_model: ["free", "freemium", "paid", "enterprise", "open_source"],
      subscriber_status: ["pending", "confirmed", "unsubscribed"],
      tool_badge: ["editors_choice", "trending", "new", "deal", "top_rated"],
    },
  },
} as const

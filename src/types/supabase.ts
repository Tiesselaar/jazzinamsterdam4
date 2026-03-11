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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      calendars: {
        Row: {
          calendar: string
          calendar_type: Database["public"]["Enums"]["calendar_type"]
          region: string
        }
        Insert: {
          calendar: string
          calendar_type?: Database["public"]["Enums"]["calendar_type"]
          region: string
        }
        Update: {
          calendar?: string
          calendar_type?: Database["public"]["Enums"]["calendar_type"]
          region?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendars_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region"]
          },
        ]
      }
      gigs: {
        Row: {
          address: string
          calendar: string
          date: string
          end_date: string
          id: number
          order_key: number
          price: string
          reviewed: boolean
          site: string
          source: string
          time: string
          title: string
          user_id: string | null
          venue: string
        }
        Insert: {
          address: string
          calendar?: string
          date: string
          end_date: string
          id?: number
          order_key?: number
          price: string
          reviewed?: boolean
          site: string
          source: string
          time: string
          title: string
          user_id?: string | null
          venue: string
        }
        Update: {
          address?: string
          calendar?: string
          date?: string
          end_date?: string
          id?: number
          order_key?: number
          price?: string
          reviewed?: boolean
          site?: string
          source?: string
          time?: string
          title?: string
          user_id?: string | null
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      hosts: {
        Row: {
          canonical: string
          host: string
        }
        Insert: {
          canonical: string
          host: string
        }
        Update: {
          canonical?: string
          host?: string
        }
        Relationships: []
      }
      metadata: {
        Row: {
          calendar: string
          canonical: string
          description: string
          order: number
          shortTitle: string
          slug: string
          title: string
        }
        Insert: {
          calendar: string
          canonical?: string
          description: string
          order?: number
          shortTitle: string
          slug: string
          title: string
        }
        Update: {
          calendar?: string
          canonical?: string
          description?: string
          order?: number
          shortTitle?: string
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "metadata_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: true
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "metadata_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: true
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      permissions: {
        Row: {
          moderator_id: string
        }
        Insert: {
          moderator_id: string
        }
        Update: {
          moderator_id?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          region: string
          time_zone: string
        }
        Insert: {
          region: string
          time_zone?: string
        }
        Update: {
          region?: string
          time_zone?: string
        }
        Relationships: []
      }
    }
    Views: {
      redirects: {
        Row: {
          calendar: string 
          host: string 
          order: number 
          slug: string 
        }
        Relationships: [
          {
            foreignKeyName: "metadata_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: true
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "metadata_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: true
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      view_gigs: {
        Row: {
          address: string 
          archive: boolean 
          calendar: string 
          calendar_type: Database["public"]["Enums"]["calendar_type"] 
          current_display_date: string 
          date: string 
          date_time: string 
          display_date: string 
          end_date: string 
          id: number 
          order_key: number 
          price: string 
          region: string 
          reviewed: boolean 
          site: string 
          source: string 
          time: string 
          time_zone: string 
          title: string 
          user_id: string | null
          venue: string 
        }
        Relationships: [
          {
            foreignKeyName: "calendars_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      view_gigs_with_display_date: {
        Row: {
          address: string 
          calendar: string 
          calendar_type: Database["public"]["Enums"]["calendar_type"] 
          current_display_date: string 
          date: string 
          date_time: string 
          display_date: string 
          end_date: string 
          id: number 
          order_key: number 
          price: string 
          region: string 
          reviewed: boolean 
          site: string 
          source: string 
          time: string 
          time_zone: string 
          title: string 
          user_id: string | null
          venue: string 
        }
        Relationships: [
          {
            foreignKeyName: "calendars_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      view_gigs_with_time: {
        Row: {
          address: string 
          calendar: string 
          calendar_type: Database["public"]["Enums"]["calendar_type"] 
          current_display_date: string 
          date: string 
          date_time: string 
          end_date: string 
          id: number 
          order_key: number 
          price: string 
          region: string 
          reviewed: boolean 
          site: string 
          source: string 
          time: string 
          time_zone: string 
          title: string 
          user_id: string | null
          venue: string 
        }
        Relationships: [
          {
            foreignKeyName: "calendars_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "calendars"
            referencedColumns: ["calendar"]
          },
          {
            foreignKeyName: "gigs_calendar_fkey"
            columns: ["calendar"]
            isOneToOne: false
            referencedRelation: "view_timed_calendars"
            referencedColumns: ["calendar"]
          },
        ]
      }
      view_timed_calendars: {
        Row: {
          calendar: string 
          calendar_type: Database["public"]["Enums"]["calendar_type"] 
          current_display_date: string 
          region: string 
          time_zone: string 
        }
        Relationships: [
          {
            foreignKeyName: "calendars_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["region"]
          },
        ]
      }
    }
    Functions: {
      cal_today: { Args: { cal: string }; Returns: string }
      is_moderator: { Args: never; Returns: boolean }
    }
    Enums: {
      calendar_type: "concert" | "film" | "exhibition"
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
      calendar_type: ["concert", "film", "exhibition"],
    },
  },
} as const

export interface User {
    id: string;
    created_at: string;
};

export interface Group {
    id: string;
    name: string;
    description: string;
    created_by: string;
    created_at: string;
    last_updated: string;
}

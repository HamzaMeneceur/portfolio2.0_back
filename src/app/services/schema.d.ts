export type user = {
    email: string,
    password: string,
    created_at?: Date,
    updated_at?: Date
}

export type social_network = {
    label: string,
    link: string,
    user_email: string,
    created_at?: Date,
    updated_at?: Date
}

export type project = {
    id: number,
    name: string,
    link: string,
    project_date?: Date,
    type_of_project: string,
    user_email: string,
    created_at?: Date,
    updated_at?: Date
}
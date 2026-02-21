export type Role = 'admin' | 'manager' | 'employee'

export const PERMISSIONS = {
    // Properties
    VIEW_PROPERTIES: ['admin', 'manager', 'employee'],
    ADD_PROPERTY: ['admin', 'manager'],
    EDIT_PROPERTY: ['admin', 'manager'],
    DELETE_PROPERTY: ['admin'],
    TOGGLE_FEATURED: ['admin', 'manager'],
    TOGGLE_ACTIVE: ['admin', 'manager'],

    // Inquiries
    VIEW_INQUIRIES: ['admin', 'manager', 'employee'],
    UPDATE_INQUIRY: ['admin', 'manager', 'employee'],
    DELETE_INQUIRY: ['admin', 'manager'],
    EXPORT_INQUIRIES: ['admin', 'manager'],

    // Users
    VIEW_USERS: ['admin'],
    ADD_USER: ['admin'],
    EDIT_USER: ['admin'],
    DELETE_USER: ['admin'],
    ASSIGN_ROLES: ['admin'],

    // Settings
    VIEW_SETTINGS: ['admin', 'manager'],
    EDIT_SETTINGS: ['admin'],

    // Activity Logs
    VIEW_LOGS: ['admin'],
} as const

export type Permission = keyof typeof PERMISSIONS

export function hasPermission(role: Role, permission: Permission): boolean {
    return (PERMISSIONS[permission] as readonly string[]).includes(role)
}

export function requirePermission(role: Role, permission: Permission): void {
    if (!hasPermission(role, permission)) {
        throw new Error(`Access denied. Required permission: ${permission}`)
    }
}

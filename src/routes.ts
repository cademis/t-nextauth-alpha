/**
 * an array of routes that are public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * an array of routes that are used for authentication
 * these routes will route logged in users to the settings page
 * @type {string[]}
 */
export const authRoutes = ["login", "register"];

export const apiAuthPrefix = "api/auth";

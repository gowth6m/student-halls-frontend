export const AppConfig = {
    version: "0.0.1",
    stage: "dev",
    metadata: {
        title: "Student Halls",
        description:
            "Student Halls is a platform for students to review and rate their student halls.",
        icon: "/logo.svg",
        keywords:
            "student halls, reviews, ratings, halls, students, university",
        manifest: "/manifest.json",
    },
    assets: {
        icons: [],
    },
    endpoint: {
        protocol: "https",
        base: "api.student-halls.com",
        version: "v0",
    },
    localStorageKeys: {
        settings: "student-halls-settings",
        auth: "student-halls-auth",
        theme: "student-halls-theme",
    },
};

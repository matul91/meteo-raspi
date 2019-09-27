export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("firebase-messaging-sw.js", {
                scope: "./",
            })
                .then((registration) => {
                    console.log("SW registered:", registration);
                }).catch((registrationError) => {
                console.log("SW registration failed:", registrationError);
            });
        });
    }
}
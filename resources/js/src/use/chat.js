import { ref } from "vue";
import api from "../router/api";

export default function useChat() {
    const messages = ref([]);
    const errors = ref([]);

    const getMessages = async () => {
        await api.get("/api/chat").then((response) => {
            messages.value = response.data.messages;
        });
    };

    const addMessage = async (form) => {
        errors.value = [];
        try {
            await api
                .post("/api/chat/send", { text: form.message })
                .then((response) => {
                    messages.value.push(response.message);
                });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };
    return {
        messages,
        errors,
        getMessages,
        addMessage,
    };
}

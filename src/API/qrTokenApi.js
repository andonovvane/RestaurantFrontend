import { api } from "@/API/api";

export const createQrTokenForTable = async (tableId) => {
    const response = await api.post("user/qr-token/", { table_id: tableId });
    return response.data;
};

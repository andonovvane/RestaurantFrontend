import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../API/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice"

const QRLoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [statusMessage, setStatusMessage] = useState("Logging you in via QR code...");

    useEffect(() => {
        const tableId = searchParams.get("table_id");
        const qrToken = searchParams.get("qr_token");
        if (!tableId || !qrToken) {
            setStatusMessage("Invalid QR link. Please scan the table QR code again.");
            return;
        }

        const qrLogin = async () => {
            try {
                const res = await api.post("user/qr-login/", {
                    table_id: tableId,
                    qr_token: qrToken,
                });
                const { access, refresh, role, table_id } = res.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("userDetails", JSON.stringify({ role, table_id }));

                dispatch(login({ accessToken: access, details: { role, table_id } }));

                navigate("/");
            } catch (err) {
                console.error("QR login failed", err);
                if (err.response?.status === 403) {
                    const backendError = err.response?.data?.error;
                    if (backendError === "Expired qr_token") {
                        setStatusMessage("QR code expired. Please scan a fresh code.");
                        return;
                    }
                    setStatusMessage("QR code is invalid. Please rescan.");
                    return;
                }
                setStatusMessage("QR login failed. Please try scanning again.");
            }
        };

        qrLogin();
    }, [searchParams, dispatch, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md bg-gray-950 shadow-2xl rounded-2xl p-8 text-center">
                <h1 className="font-display text-2xl text-white mb-3">QR Login</h1>
                <p className="text-gray-300">{statusMessage}</p>
            </div>
        </div>
    );
};

export default QRLoginPage;

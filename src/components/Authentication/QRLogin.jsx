import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../../API/api";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice"

const QRLoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const tableId = searchParams.get("table_id");
        if (!tableId) return;

        const qrLogin = async () => {
            try {
                const res = await api.get(`user/qr-login/?table_id=${tableId}`);
                const { access, refresh, role, table_id } = res.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("userDetails", JSON.stringify({ role, table_id }));

                dispatch(login({ accessToken: access, details: { role, table_id } }));

                navigate("/");
            } catch (err) {
                console.error("QR login failed", err);
            }
        };

        qrLogin();
    }, [searchParams, dispatch, navigate]);

    return <div>Logging you in via QR code...</div>;
};

export default QRLoginPage;

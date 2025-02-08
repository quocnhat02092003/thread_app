import React from 'react';
import Input from "../../components/Input/InputText";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AuthType } from "../../types/AuthType";
import { Snackbar } from "@mui/material";

const Register: React.FC = () => {
    const [informationUserRegister, setInformationUserRegister] = React.useState<Pick<AuthType, "username" | "password">>({ username: "", password: "" });
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [validateError, setValidateError] = React.useState<boolean>(false);
    const [usernameError, setUsernameError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);

    React.useEffect(() => {
        ValidateForm();
    }, [informationUserRegister.username, informationUserRegister.password, confirmPassword]);

    const ValidateForm = () => {
        const usernameError = ValidateUsername(informationUserRegister.username);
        const passwordError = ValidatePassword(informationUserRegister.password);
        const confirmPasswordError = CheckAgainPassword(informationUserRegister.password, confirmPassword);

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

        setValidateError(!!usernameError || !!passwordError || !!confirmPasswordError);
    };

    const ValidateUsername = (username: string): string | null => {
        const patternTestUsername: RegExp = /^[a-zA-Z0-9._@]+$/;
        if (!patternTestUsername.test(username) && username.length > 8 && username) {
            return "Username không hợp lệ";
        } else if (username.length <= 8 && username) {
            return "Độ dài username phải lớn hơn 8 ký tự";
        }
        return null;
    };

    const ValidatePassword = (password: string): string | null => {
        const patternTestPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
        if (!patternTestPassword.test(password) && password.length >= 8 && password) {
            return "Password yêu cầu chữ hoa, chữ thường, có số, không chứa ký tự đặc biệt";
        } else if (password && password.length < 8) {
            return "Độ dài password phải lớn hơn hoặc bằng 8 ký tự";
        }
        return null;
    };

    const CheckAgainPassword = (password: string, confirmPassword: string): string | null => {
        if (password && confirmPassword && password !== confirmPassword) {
            return "Password không trùng nhau";
        }
        return null;
    };

    return (
        <div className="login-form">
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={true}
                autoHideDuration={3000}
                message="Tài khoản đã được tạo thành công"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center w-fit gap-5">
                    <h2>Đăng ký ngay vào tài khoản Threads</h2>
                    <div className="w-full">
                        <Input
                            onChange={(e) => setInformationUserRegister({
                                ...informationUserRegister,
                                username: e.target.value
                            })}
                            type="text"
                            placeholder="Tên người dùng, số điện thoại hoặc email"
                        />
                        {usernameError && <div className="text-right text-red-700"><small>{usernameError}</small></div>}
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={(e) => setInformationUserRegister({
                                ...informationUserRegister,
                                password: e.target.value
                            })}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                        {passwordError && <div className="text-right text-red-700"><small>{passwordError}</small></div>}
                    </div>
                    <div className="w-full">
                        <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                        {confirmPasswordError && <div className="text-right text-red-700"><small>{confirmPasswordError}</small></div>}
                    </div>
                    <Button
                        fullWidth
                        disabled={validateError || !(informationUserRegister.username && informationUserRegister.password && confirmPassword)}
                        sx={{
                            paddingY: 1,
                        }}
                        loading={false}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Đăng ký
                    </Button>
                    <div className="w-full text-right">
                        <span>Bạn đã có tài khoản ? <Link className="text-blue-500" to="/login">Đăng nhập tại đây.</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React from 'react';
import Input from "../../components/Input/InputText";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const Login: React.FC = () => {
    return (
        <div className="login-form absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center w-fit gap-5">
                <h2 >Đăng nhập bằng tài khoản Threads</h2>
                <div className="w-full">
                    <Input type="text" placeholder="Tên người dùng, số điện thoại hoặc email"/>
                </div>
                <div className="w-full">
                    <Input type="password" placeholder="Mật khẩu"/>
                </div>
                <Button
                    fullWidth
                    disabled={false}
                    sx={{
                        paddingY: 1,
                    }}
                    loading={false}
                    loadingPosition="end"
                    variant="contained"
                >
                    Đăng nhập
                </Button>
                <div className="w-full text-right">
                    <span>Bạn chưa có tài khoản? <Link className="text-blue-500" to="/register">Đăng kí tại đây.</Link></span>
                </div>
                <div className="w-full text-center">
                    <span>hoặc</span>
                    <p className="mt-2"><Link className="text-blue-500" to="/forgot_password">Quên mật khẩu?</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

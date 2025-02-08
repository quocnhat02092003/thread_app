import React from 'react';
import image_auth_login from '../assets/images/image.png'
interface AuthLayoutProps {
    children: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-200">
            <div className="auth-header">
                {/*Header*/}
                <img src={image_auth_login} alt="Image"/>
            </div>
            <div className="auth-body">
                {/*Main Content*/}
                <main>{children}</main> 
            </div>
            <div className="auth-footer">
                {/*Footer*/}
            </div>
        </div>
    );
};

export default AuthLayout;

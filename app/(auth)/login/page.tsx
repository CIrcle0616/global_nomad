import LoginForm from '@/components/domain/login/LoginForm';
import HrWithText from '@/components/domain/login/HrWithText';
import AuthLogo from '@/components/domain/login/AuthLogo';
import KakaoOauthLink from '@/components/domain/login/KakaoOauthLink';
import LinkToAuth from '@/components/domain/login/LinkToSign';

export default function LoginPage() {
  return (
    <main className="w-full max-w-[640px] h-screen pt-[110px] px-3 mx-auto">
      <div className="relative w-[270px] md:w-[340px] h-[154px] md:h-[192px] mx-auto mb-6">
        <AuthLogo />
      </div>

      <div className="mx-auto mb-6">
        <LoginForm />
      </div>

      <div className="flex justify-center text-gray-900 mb-10">
        <LinkToAuth text="회원이 아니신가요?" href="/signup" childrenText="회원가입하기" />
      </div>

      <div>
        <HrWithText text="SNS 계정으로 로그인하기" />

        <div className="relative w-12 h-12 mx-auto">
          <KakaoOauthLink />
        </div>
      </div>
    </main>
  );
}

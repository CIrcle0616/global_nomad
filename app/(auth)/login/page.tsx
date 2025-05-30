import LoginForm from '@/components/domain/auth/LoginForm';
import HrWithText from '@/components/domain/auth/HrWithText';
import AuthLogo from '@/components/domain/auth/AuthLogo';
import KakaoOauthLink from '@/components/domain/auth/KakaoOauthLink';
import LinkToAuth from '@/components/domain/auth/LinkToSign';

export default function LoginPage() {
  return (
    <main className="w-full max-w-[640px] h-screen pt-[110px] px-3 mx-auto">
      <div className="w-[270px] md:w-[340px] h-[154px] md:h-[192px] mx-auto mb-6">
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

        <div className="w-12 md:w-[72px] h-12 md:h-[72px] mx-auto">
          <KakaoOauthLink />
        </div>
      </div>
    </main>
  );
}

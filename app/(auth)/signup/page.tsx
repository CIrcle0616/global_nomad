import AuthLogo from '@/components/domain/auth/AuthLogo';
import HrWithText from '@/components/domain/auth/HrWithText';
import KakaoOauthLink from '@/components/domain/auth/KakaoOauthLink';
import LinkToAuth from '@/components/domain/auth/LinkToSign';
import SignUpForm from '@/components/domain/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <main className="w-full max-w-[640px] h-screen pt-[110px] px-3 mx-auto">
      <div className="relative w-[270px] md:w-[340px] h-[154px] md:h-[192px] mx-auto mb-6">
        <AuthLogo />
      </div>

      <div className="mx-auto mb-6">
        <SignUpForm />
      </div>

      <div className="flex justify-center text-gray-900 mb-10">
        <LinkToAuth text="회원이신가요?" href="/login" childrenText="로그인하기" />
      </div>

      <div>
        <HrWithText text="SNS 계정으로 회원가입하기" />

        <div className="relative w-12 h-12 mx-auto md:w-[72px] md:h-[72px]">
          <KakaoOauthLink />
        </div>
      </div>
    </main>
  );
}

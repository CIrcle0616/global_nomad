type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
//https://nextjs.org/docs/app/guides/upgrading/version-15#params--searchparams SSR에서 searchParams 사용하는 법

export default function NewAndEditActivityPage(props: {searchParams: SearchParams}) {
  /*if(searchParams) {
    기존 데이터를 로드해서 아래 폼에 뿌려줄 수 있도록 함
  } */
  return <h1>이 곳에서 체험을 등록하고 수정할 수 있는 페이지를 생성합니다.</h1>
};
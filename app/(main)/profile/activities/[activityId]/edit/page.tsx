'use client';
//수정을 담당하는 페이지
import DropdownSelect from '@/components/common/DropDownSelect';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { getActivitiesId, postActivityImg } from '@/services/activities';
import { useModalStore } from '@/store/modalStore';
import OneButtonModal from '@/components/common/modal/OneButtonModal';
import { useParams, useRouter } from 'next/navigation';
import { patchMyActivities } from '@/services/myActivities';
import { format } from 'date-fns';
import Select from 'react-select';

type TimeForm = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

interface AddressData {
  address: string;
  addressType: 'R' | 'J';
  bname: string;
  buildingName: string;
  zonecode: string;
  userSelectedType: 'R' | 'J';
  jibunAddress: string;
  roadAddress: string;
}

export default function ActivityEditPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [selecteDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const startHours = Array.from({ length: 12 }, (_, i) => i + 9); // 9~ 20시까지
  const endHours = Array.from({ length: 12 }, (_, i) => i + 10); // 10~21시까지
  const minutes = [0]; // 10분 30분 추가할 수 있음
  const [forms, setForms] = useState<TimeForm[]>([]);
  const [bannerImages, setBannerImages] = useState<File[]>([]);
  const [introImages, setIntroImages] = useState<File[]>([]);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const introInputRef = useRef<HTMLInputElement>(null);
  const { openModal } = useModalStore();
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

  const handleDetailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(event.target.value);
  };
  const handleAddressDetailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDetailAddress(event.target.value);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => setPrice(event.target.value);
  const openAddress = useDaumPostcodePopup();
  const handleAddressChange = (data: AddressData) => setAddress(data.address);
  const handleAddressClick = () => {
    openAddress({ onComplete: handleAddressChange });
  };
  const dateCheck = (): boolean => {
    const today = new Date();
    const todayDate = format(today, 'yyyy-MM-dd'); // 예시

    const parseDate = (raw: string): Date => {
      if (raw.includes('.')) {
        const matched = raw.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\./);
        if (!matched) throw new Error('날짜 형식이 잘못되었습니다');
        const [, year, month, day] = matched;
        return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      } else {
        return new Date(raw);
      }
    };

    const selectDay = parseDate(selecteDate);
    const nowDay = parseDate(todayDate);

    if (selectDay < nowDay) {
      alert('선택 날짜는 오늘 날짜보다 전 일수 없습니다.'); //모달 쓸수있음
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerImages.length) {
      alert('배너 이미지를 업로드하세요.');
      return;
    }

    if (!introImages.length) {
      alert('소개 이미지를 하나 이상 업로드하세요.');
      return;
    }

    try {
      const { activityImageUrl: bannerImageUrl } = await postActivityImg(bannerImages[0]);

      const subImageUrls: string[] = [];
      for (const file of introImages) {
        const { activityImageUrl } = await postActivityImg(file);
        subImageUrls.push(activityImageUrl);
      }

      const formatDate = (raw: string) => {
        const matched = raw.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\./);
        if (!matched) throw new Error('날짜 형식이 잘못되었습니다');
        const [, year, month, day] = matched;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      const schedules = forms.map(form => ({
        date: formatDate(form.date),
        startTime: form.startTime,
        endTime: form.endTime,
      }));

      await patchMyActivities({
        activityId: Number(params.activityId),
        body: {
          title,
          category,
          description: detail,
          address: `${address} ${detailAddress}`,
          price: Number(price),
          bannerImageUrl,
          subImageIdsToRemove: [],
          subImageUrlsToAdd: subImageUrls,
          scheduleIdsToRemove: [],
          schedulesToAdd: schedules,
        },
      });

      openModal(OneButtonModal, {
        content: '체험 수정이 완료되었습니다.',
        buttonText: '확인',
        onConfirm: () => router.push('/profile/activities'),
      });
    } catch (err) {
      console.error('폼 제출 중 오류 발생:', err);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleAddForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!selecteDate || !startTime || !endTime) {
      alert('시작 시간과 종료 시간을 선택하세요');
      return;
    }

    const newForm: TimeForm = {
      id: forms.length + 1,
      date: selecteDate,
      startTime,
      endTime,
    };

    const newFormTime = (time: string): number => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = newFormTime(newForm.startTime);
    const newEnd = newFormTime(newForm.endTime);

    if (newStart >= newEnd) {
      alert('시작 시간은 종료 시간보다 빨라야 합니다.'); //모달 쓸수있음
      return;
    }

    if (!dateCheck()) {
      return;
    }

    if (forms.length > 0) {
      for (let i = 0; i < forms.length; i++) {
        const formNowIndex = forms[i];
        const formStartTime = newFormTime(formNowIndex.startTime);
        const formEndTime = newFormTime(formNowIndex.endTime);

        if (formNowIndex.date === newForm.date) {
          if (
            (newStart >= formStartTime && newStart < formEndTime) ||
            (newEnd > formStartTime && newEnd <= formEndTime) ||
            (newStart <= formStartTime && newEnd >= formEndTime)
          ) {
            alert('겹치는 시간에는 예약할 수 없습니다!'); //모달 쓸수있음
            return;
          }
        }
      }
    }

    setForms([...forms, newForm]);
    setStartTime('');
    setEndTime('');
  };

  const handleDeleteForm = (id: number) => {
    setForms(prevForms => prevForms.filter(form => form.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'banner' | 'intro') => {
    const files = Array.from(e.target.files ?? []);
    if (imageType === 'banner') {
      setBannerImages(files.slice(0, 1));
    } else if (imageType === 'intro') {
      setIntroImages(prev => [...prev, ...files].slice(0, 4));
    }
  };
  const handleIntroImageRemove = (index: number) => {
    setIntroImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleBannerImageRemove = (index: number) => {
    setBannerImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const options = [
    { value: 'culture', label: '문화 예술' },
    { value: 'food', label: '식음료' },
    { value: 'sports', label: '스포츠' },
    { value: 'tour', label: '투어' },
    { value: 'travel', label: '관광' },
    { value: 'wellbeing', label: '웰빙' },
  ];
  const startTimeOptions = startHours.flatMap(h =>
    minutes.map(m => {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      return { value: `${hh}:${mm}`, label: `${hh}:${mm}` };
    }),
  );

  const endTimeOptions = endHours.flatMap(h =>
    minutes.map(m => {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      return { value: `${hh}:${mm}`, label: `${hh}:${mm}` };
    }),
  );

  const params = useParams();
  const activityId = Number(params.activityId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivitiesId(Number(activityId));

        setTitle(data.title);
        setCategory(data.category);
        setDetail(data.description);
        setPrice(String(data.price));

        const [base, detail] = data.address.split(' ');
        setAddress(base);
        setDetailAddress(detail);

        if (data.bannerImageUrl) {
          const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(data.bannerImageUrl)}`;
          const response = await fetch(proxyUrl);
          const blob = await response.blob();
          const file = new File([blob], 'banner.jpg', { type: blob.type });
          setBannerImages([file]);
        }
        if (data.subImages?.length) {
          const files = await Promise.all(
            data.subImages.map(async (img, index) => {
              const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(img.imageUrl)}`;
              const res = await fetch(proxyUrl);
              const blob = await res.blob();
              return new File([blob], `intro-${index}.jpg`, { type: blob.type });
            }),
          );

          setIntroImages(files);
        }

        if (data.schedules?.length) {
          const formatted = data.schedules.map((s, idx) => ({
            id: idx + 1,
            date: s.date.replace(/-/g, '. ') + '.',
            startTime: s.startTime,
            endTime: s.endTime,
          }));
          setForms(formatted);
        }
      } catch (err) {
        console.error('체험 상세 불러오기 실패:', err);
      }
    };

    fetchData();
  }, [activityId]);

  return (
    <div className="max-w-[792px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">내 체험 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="제목"
          required
        />

        <Select
          options={options}
          placeholder="카테고리 선택"
          value={options.find(o => o.value === category)}
          onChange={selected => setCategory(selected?.value ?? '')}
          className="w-full"
        />

        <textarea
          value={detail}
          onChange={handleDetailChange}
          className="w-full border border-gray-300 rounded px-4 py-2 h-96 resize-none"
          placeholder="설명"
          required
        />
        <h1 className="text-2xl font-bold">가격</h1>

        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="가격"
          required
        />

        <h1 className="text-2xl font-bold">주소</h1>

        <input
          type="text"
          value={address}
          readOnly
          onClick={handleAddressClick}
          className="w-full border border-gray-300 rounded px-4 py-2 cursor-pointer bg-white"
          placeholder="주소를 검색하려면 클릭하세요"
          required
        />

        <input
          type="text"
          value={detailAddress}
          onChange={handleAddressDetailChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="상세 주소를 입력하세요"
        />
        <h1 className="text-2xl font-bold mb-2">예약 가능한 시간대</h1>

        <div className="flex flex-wrap items-end gap-4 ">
          <div className="w-40 ">
            <DropdownSelect
              type="datepicker"
              placeholder="YY/MM/DD"
              options={[]}
              selected={selecteDate}
              onSelect={dateStr => setSelectedDate(dateStr)}
            />
          </div>
          <Select
            options={startTimeOptions}
            placeholder="시간 선택"
            value={startTimeOptions.find(o => o.value === startTime)}
            onChange={selected => setStartTime(selected?.value ?? '')}
            className="w-40"
            styles={{
              control: base => ({
                ...base,
                height: 50,
                textAlign: 'center',
              }),
              singleValue: base => ({
                ...base,
                color: '#111827',
              }),
            }}
          />

          <div className="text-lg h-[40px]">~</div>

          <Select
            options={endTimeOptions}
            placeholder="시간 선택"
            value={endTimeOptions.find(o => o.value === endTime) ?? null}
            onChange={selected => setEndTime(selected?.value ?? '')}
            className="w-40"
            styles={{
              control: base => ({
                ...base,
                height: 50,
                textAlign: 'center',
              }),
              singleValue: base => ({
                ...base,
                color: '#111827',
              }),
            }}
          />

          <button
            type="button"
            onClick={handleAddForm}
            className="w-16 bg-nomad-black text-white py-1 rounded hover:bg-green-500 text-[29px]"
          >
            +
          </button>
        </div>

        {forms.map(form => (
          <div key={form.id} className="flex items-end gap-4 mb-2">
            <div className="w-40">
              <input
                type="text"
                value={form.date}
                readOnly
                className="h-[50px] w-full px-3 border border-gray-300 rounded-md text-gray-900"
              />
            </div>

            <div className="w-40">
              <input
                type="text"
                value={form.startTime}
                readOnly
                className="h-[50px] w-full px-3 border border-gray-300 rounded-md text-center text-gray-900"
              />
            </div>

            <div className="text-lg h-[50px] flex items-center">~</div>

            <div className="w-40">
              <input
                type="text"
                value={form.endTime}
                readOnly
                className="h-[50px] w-full px-3 border border-gray-300 rounded-md text-center text-gray-900"
              />
            </div>
            <button
              type="button"
              onClick={() => handleDeleteForm(form.id)}
              className="w-16 bg-white text-black border border-black py-1 rounded hover:bg-gray-100 text-[29px]"
            >
              -
            </button>
          </div>
        ))}

        <h1 className="text-2xl font-bold">배너 이미지</h1>
        <>
          <input type="file" ref={bannerInputRef} onChange={e => handleImageUpload(e, 'banner')} className="hidden" />

          <div className="flex gap-4 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="w-36 h-36 border border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition"
            >
              <svg
                className="w-6 h-6 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-sm">이미지 등록</span>
            </button>

            {bannerImages.map((file, index) => (
              <div key={index} className="relative w-36 h-36 border rounded overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => handleBannerImageRemove(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>

        <h1 className="text-2xl font-bold">소개 이미지</h1>

        <>
          <input type="file" ref={introInputRef} onChange={e => handleImageUpload(e, 'intro')} className="hidden" />

          <div className="flex gap-4 mt-4 flex-wrap items-start">
            <button
              type="button"
              onClick={() => introInputRef.current?.click()}
              className="w-36 h-36 border border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center text-gray-600 hover:bg-gray-50 transition"
            >
              <svg
                className="w-6 h-6 mb-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-sm">이미지 등록</span>
            </button>

            {introImages.map((file, index) => (
              <div key={index} className="relative w-36 h-36 border rounded overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="배너 이미지 미리보기"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => handleIntroImageRemove(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
        <button type="submit" className="w-full bg-nomad-black text-white py-2 rounded hover:bg-green-500">
          저장
        </button>
      </form>
    </div>
  );
}

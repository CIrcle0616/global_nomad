'use client';

import DropdownSelect from '@/components/common/DropDownSelect';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postActivities, postActivityImg } from '@/services/activities';

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

export default function NewAndEditActivityPage() {
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

      await postActivities({
        title,
        category,
        description: detail,
        address: `${address} ${detailAddress}`,
        price: Number(price),
        schedules,
        bannerImageUrl,
        subImageUrls,
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

    if (forms.length > 0) {
      const newStart = newFormTime(newForm.startTime);
      const newEnd = newFormTime(newForm.endTime);

      for (let i = 0; i < forms.length; i++) {
        const formNowIndex = forms[i];
        const formStartTime = newFormTime(formNowIndex.startTime);
        const formEndTime = newFormTime(formNowIndex.endTime);
        console.log(formNowIndex.date, newForm.date);
        if (formNowIndex.date === newForm.date) {
          if (
            (newStart >= formStartTime && newStart < formEndTime) ||
            (newEnd > formStartTime && newEnd <= formEndTime) ||
            (newStart <= formStartTime && newEnd >= formEndTime)
          ) {
            alert('겹치는 시간에는 예약할 수 없습니다!');
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

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
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

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        >
          <option value="" disabled hidden>
            카테고리 선택
          </option>
          <option value="문화 예술">문화 예술</option>
          <option value="식음료">식음료</option>
          <option value="스포츠">스포츠</option>
          <option value="투어">투어</option>
          <option value="관광">관광</option>
          <option value="웰빙">웰빙</option>
        </select>

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
          <select
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="h-[50px] w-40 px-3 text-base border border-gray-300 rounded-md text-gray-900 text-center"
          >
            <option value="">시간 선택</option>
            {startHours.map(h =>
              minutes.map(m => {
                const hh = h.toString().padStart(2, '0');
                const mm = m.toString().padStart(2, '0');
                return (
                  <option key={`${hh}:${mm}`} value={`${hh}:${mm}`}>
                    {`${hh}:${mm}`}
                  </option>
                );
              }),
            )}
          </select>

          <div className="text-lg h-[40px]">~</div>

          <select
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="h-[50px] w-40 px-3 text-base border border-gray-300 rounded-md text-gray-900 text-center"
          >
            <option value="">시간 선택</option>
            {endHours.map(h =>
              minutes.map(m => {
                const hh = h.toString().padStart(2, '0');
                const mm = m.toString().padStart(2, '0');
                return (
                  <option key={`${hh}:${mm}`} value={`${hh}:${mm}`}>
                    {`${hh}:${mm}`}
                  </option>
                );
              }),
            )}
          </select>

          <button
            type="button"
            onClick={handleAddForm}
            className="w-16 bg-green-500 text-white py-1 rounded hover:bg-green-600 text-[29px]"
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
          <input
            type="file"
            ref={bannerInputRef}
            onChange={e => handleImageUpload(e, 'banner')}
            className="hidden"
            required
          />

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
              <div key={index} className="w-36 h-36 border rounded overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
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
              <div key={index} className="w-36 h-36 border rounded overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="배너 이미지 미리보기"
                  width={144}
                  height={144}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          저장
        </button>
      </form>
    </div>
  );
}

"use client";
import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  category,
  gender,
  grade,
  individualOrGroup,
  major,
  musicOrPose,
} from "@/template/inputTypes";
import Selection from "./Selection";
import TextInput from "./TextInput";
import { quicksand } from "@/public/fonts/font";
import {
  categoryOption1,
  categoryOption2,
  categoryOption3,
  categoryOption4,
  categoryOption5,
  categoryOption6,
  genderOption,
  gradeOption1,
  gradeOption2,
  individualOrGroupOption,
  majorOption,
  musicOrPoseOption,
} from "@/template/options";
import MusicInput from "./MusicInput";
import Button from "./Button";
import { Reception } from "@/template/reception";

const ReceptionForm = (): ReactNode => {
  //useState
  const [individualOrGroup, setIndividualOrGroup] =
    useState<individualOrGroup>("");
  const [gender, setGender] = useState<gender>("");
  const [major, setMajor] = useState<major>("");
  const [grade, setGrade] = useState<grade>("");
  const [category, setCategory] = useState<category>("");
  const [musicOrPose, setMusicOrPose] = useState<musicOrPose>("");
  const [participantsList, setParticipantsList] = useState<string[]>([]);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  //useState_errors_textInputs
  const [nameError, setNameError] = useState<boolean>(false);
  const [birthError, setBirthError] = useState<boolean>(false);
  const [contactError, setContactError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [schoolError, setSchoolError] = useState<boolean>(false);
  const [academyError, setAcademyError] = useState<boolean>(false);
  const [instructorNameError, setInstructorNameError] = useState<boolean>(false);
  const [instructorContactError, setInstructorContactError] = useState<boolean>(false);
  const [artTitleError, setArtTitleError] = useState<boolean>(false);
  //useState_errors_selections
  const [individualOrGroupError, setIndividualOrGroupError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [majorError, setMajorError] = useState<boolean>(false);
  const [gradeError, setGradeError] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [musicOrPoseError, setMusicOrPoseError] = useState<boolean>(false);
  const [participantError, setParticipantError] = useState<boolean>(false);
  //useState_error_music
  const [musicFileError, setMusicFileError] = useState<boolean>(false);

  //useRef_textInputs
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);
  const academyRef = useRef<HTMLInputElement>(null);
  const instructorNameRef = useRef<HTMLInputElement>(null);
  const instructorContactRef = useRef<HTMLInputElement>(null);
  const artTitleRef = useRef<HTMLInputElement>(null);
  const participantRef = useRef<HTMLInputElement>(null);
  //useRef_selections
  const individualOrGroupRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const majorRef = useRef<HTMLInputElement>(null);
  const gradeRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const musicOrPoseRef = useRef<HTMLInputElement>(null);
  //useRef_music
  const musicFileRef = useRef<HTMLDivElement>(null);

  //variables
  const individual: boolean = individualOrGroup !== "단체";

  //functions
  const inputCheck = (
    ref: RefObject<HTMLInputElement>,
    setStateError: Dispatch<SetStateAction<boolean>>
  ): boolean => {
    if (!ref.current) return false;
    const inputRef = ref as RefObject<HTMLInputElement>;
    if (ref.current.value.trim() === "" || ref.current.value === undefined) {
      setStateError(true);
      return true;
    }
    return false;
  };

  const checkError = (): boolean => {
    let error = false;
    (
      [
        [nameRef, setNameError],
        [birthRef, setBirthError],
        [contactRef, setContactError],
        [emailRef, setEmailError],
        [schoolRef, setSchoolError],
        [academyRef, setAcademyError],
        [instructorNameRef, setInstructorNameError],
        [instructorContactRef, setInstructorContactError],
        [artTitleRef, setArtTitleError],
        [individualOrGroupRef, setIndividualOrGroupError],
        [genderRef, setGenderError],
        [majorRef, setMajorError],
        [gradeRef, setGradeError],
        [categoryRef, setCategoryError],
        [musicOrPoseRef, setMusicOrPoseError],
      ] as [RefObject<HTMLInputElement>, Dispatch<SetStateAction<boolean>>][]
    ).map(([element, setError]) => {
      const res = inputCheck(element, setError);
      error = error || res;
    });
    //music file check
    
    if(musicFileRef.current){
      console.log('musicFile:',musicFile)
      if(musicFile === null){
        setMusicFileError(true);
        error = true;
      }
    }
    
    return error;
  };

  const onSubmit = () => {
    if (checkError() === true) return;
    const newReception: Reception = {
      timestamp: new Date(),
      individualOrGroup: individualOrGroup,
      name: nameRef.current!.value.trim(),
      gender: gender,
      birth: birthRef.current!.value.trim(),
      contact: contactRef.current!.value.trim(),
      email: emailRef.current!.value.trim(),
      school: schoolRef.current!.value.trim(),
      academy: academyRef.current!.value.trim(),
      instructorName: instructorNameRef.current!.value.trim(),
      instructorContact: instructorContactRef.current!.value.trim(),
      major: major,
      grade: grade,
      category: category,
      artTitle: artTitleRef.current!.value,
      musicFile: musicFile,
      musicOrPose: musicOrPose ?? null,
      participants: participantsList.length === 0 ? null : participantsList
    }
    console.log(newReception);
    

  };

  const onAddParticipant = (e: any) => {
    e.preventDefault();
    if (participantRef && participantRef.current) {
      if (participantRef.current!.value.trim() === "") {
        setParticipantError(true);
        return;
      }
      setParticipantsList((prev) => [...prev, participantRef.current!.value]);
      participantRef.current!.value = "";
    }
  };

  const onRemoveParticipant = (target: string) => {
    const newList = participantsList.filter(
      (participant) => participant !== target
    );
    setParticipantsList(newList);
  };

  return (
    <div className="flex flex-col">
      <form className={`pt-10 flex gap-20 ${quicksand.className}`}>
        <div>
          <Selection
            value={individualOrGroup}
            onChange={(value: string) => {
              setIndividualOrGroup(value as individualOrGroup);
              setIndividualOrGroupError(false);
            }}
            label={"개인/단체 선택"}
            placeholder="개인/단체 선택"
            error={individualOrGroupError}
            options={individualOrGroupOption}
            ref={individualOrGroupRef}
          />
          <div className="flex gap-10 my-10">
            <div className="p-8 flex flex-col">
              <label className="text-xl">
                {individual ? "참가자 정보" : "대표자 정보"}
              </label>
              <TextInput
                label="참가자 이름"
                error={nameError}
                ref={nameRef}
                helperText={!individual ? "(대표자 이름 외 00명)" : ""}
                onChange={() => setNameError(false)}
              />
              <Selection
                value={gender}
                onChange={(value: string) => {
                  setGender(value as gender);
                  setGenderError(false);
                }}
                label={"성별"}
                placeholder="성별 선택"
                error={genderError}
                options={genderOption}
                ref={genderRef}
              />
              <TextInput
                label="생년월일"
                error={birthError}
                ref={birthRef}
                onChange={() => setBirthError(false)}
                helperText="*(2024-01-01)"
              />
              <TextInput
                label="참가자 연락처"
                error={contactError}
                ref={contactRef}
                onChange={() => setContactError(false)}
                helperText="*(010-1234-5678)"
              />
              <TextInput
                label="이메일"
                error={emailError}
                ref={emailRef}
                onChange={() => setEmailError(false)}
              />
            </div>
            <div className="p-8 flex flex-col">
              <label className="text-xl">추가 정보</label>

              <TextInput
                label="학교명"
                error={schoolError}
                ref={schoolRef}
                helperText="*(홈스쿨링은 '홈스쿨링'으로 기재)"
                onChange={() => setSchoolError(false)}
              />
              <TextInput
                label="학원명"
                error={academyError}
                ref={academyRef}
                helperText="*(없을 경우, '없음'으로 기재)"
                onChange={() => setAcademyError(false)}
              />
              <TextInput
                label="지도자 성함"
                error={instructorNameError}
                ref={instructorNameRef}
                onChange={() => setInstructorNameError(false)}
              />
              <TextInput
                label="지도자 연락처"
                error={instructorContactError}
                ref={instructorContactRef}
                onChange={() => setInstructorContactError(false)}
                helperText="*(010-1234-5678)"
              />
            </div>
          </div>
        </div>
        <div>
          <Selection
            value={major}
            onChange={(value: string) => {
              setMajor(value as major);
              setMajorError(false);
            }}
            label={"전공 선택"}
            placeholder="전공 선택"
            error={majorError}
            options={majorOption}
            ref={majorRef}
          />
          <div className="flex gap-10 my-10">
            <div className="p-8 flex flex-col">
              <label className="text-xl">전공 상세</label>

              {individual && (
                <Selection
                  value={grade}
                  onChange={(value: string) => {
                    setGrade(value as grade);
                    setGradeError(false);
                  }}
                  label={"학년 선택"}
                  placeholder="학년 선택"
                  options={major === "발레" ? gradeOption1 : gradeOption2}
                  error={gradeError}
                  ref={gradeRef}
                  disabled={major === ""}
                />
              )}
              <Selection
                value={category}
                onChange={(value: string) => {
                  setCategory(value as category);
                  setCategoryError(false);
                }}
                label={"부문 선택"}
                placeholder="부문 선택"
                error={categoryError}
                options={
                  individual
                    ? grade === "초등부 저학년(3학년)" ||
                      grade === "초등부 저학년(4학년)"
                      ? categoryOption2
                      : major === "한국무용"
                      ? categoryOption1
                      : major === "발레"
                      ? categoryOption3
                      : categoryOption4
                    : major === "한국무용" || major === "컨템포러리댄스"
                    ? categoryOption5
                    : categoryOption6
                }
                ref={categoryRef}
                disabled={individual && (major === "" || grade === "")}
              />
              <TextInput
                label="작품 제목"
                error={artTitleError}
                ref={artTitleRef}
                disabled={
                  major === "" ||
                  grade === "" ||
                  category === "즉흥" ||
                  category === "즉흥<Movement Phrase 1 & 즉흥>" ||
                  category === "즉흥<기초실기 A,B & 즉흥>"
                }
                value={
                  category === "즉흥" ||
                  category === "즉흥<Movement Phrase 1 & 즉흥>" ||
                  category === "즉흥<기초실기 A,B & 즉흥>"
                    ? "즉흥"
                    : null
                }
                onChange={() => setArtTitleError(false)}
              />
              {(!individual ||
                (individual &&
                  ((major === "한국무용" && category === "전통(재구성)") ||
                    (major === "발레" &&
                      category === "고전<기초실기 A,B & Variation>") ||
                    (major === "컨템포러리댄스" &&
                      (grade === "초등부 저학년(3학년)" ||
                        grade === "초등부 저학년(4학년)"))))) && (
                <Selection
                  value={musicOrPose}
                  onChange={(value: string) => {
                    setMusicOrPose(value as musicOrPose);
                    setMusicOrPoseError(false);
                  }}
                  label={"음악/포즈 선택"}
                  placeholder={"음악/포즈 선택"}
                  error={musicOrPoseError}
                  options={musicOrPoseOption}
                  ref={musicOrPoseRef}
                />
              )}
              {!((major === '한국무용' && category === '즉흥') ||
               (major === '발레' && category === '즉흥<기초실기 A,B & 즉흥>' ) ||
               (major === '컨템포러리댄스')) && 
              <MusicInput onChange={(file:File) => {
                setMusicFile(file)
                setMusicFileError(false)
              }} fileName={musicFile ? musicFile.name : null} error={musicFileError} ref={musicFileRef} />}
            </div>
            {!individual && (
              <div className="p-8 flex flex-col">
                <label className="text-xl">참가자 정보</label>
                {participantsList.map((participant, idx) => (
                  <p
                    className="mt-6 relative cursor-pointer"
                    onClick={() => onRemoveParticipant(participant)}
                    key={idx}
                  >{`${idx + 1}. ${participant}`}</p>
                ))}
                <TextInput
                  label={"참가자 추가"}
                  helperText="*이름/학교/학년 (클릭해서 삭제 가능)"
                  ref={participantRef}
                  onChange={() => setParticipantError(false)}
                  error={participantError}
                />
                <button
                  className="self-center underline underline-offset-4 m-4"
                  onClick={(e) => {
                    onAddParticipant(e);
                  }}
                >
                  추가
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
      <Button className="w-40 self-center" onClick={onSubmit}>
        접수하기
      </Button>
    </div>
  );
};

export default ReceptionForm;

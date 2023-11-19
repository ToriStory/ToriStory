import { orange400 } from 'constants/color';
import { Mic, MicOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({
  useForm,
  index,
}: {
  useForm: UseFormReturn<{ thankNote: { content: string }[] }>;
  index: number;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setValue, setFocus } = useForm;
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  useEffect(() => {
    let text = transcript;
    if (transcript.length > 200) text = transcript.substring(0, 200);
    if (isFocused) {
      console.log(transcript);
      console.log(`thankNote.${index}.content`);
      setValue(`thankNote.${index}.content`, text);
    }
  }, [index, isFocused, setValue, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='flex justify-center items-center'>
      <div>감사합니다</div>
      <button
        type='button'
        onClick={() =>
          isFocused && listening
            ? (SpeechRecognition.stopListening(), setIsFocused(false), resetTranscript())
            : (resetTranscript(),
              setFocus(`thankNote.${index}.content`),
              setIsFocused(true),
              SpeechRecognition.startListening({ continuous: true, language: 'ko' }))
        }
      >
        {isFocused && listening ? <Mic color={orange400} /> : <MicOff color={orange400} />}
      </button>
    </div>
  );
};

export default Dictaphone;

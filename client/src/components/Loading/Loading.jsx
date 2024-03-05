import { useState, useEffect } from 'react';
import ErrorModal from '../Modals/ErrorModal';

function Loading() {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(true);
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before 30 seconds
  }, []);

  return (
    <div>
       <div>
    <div className="flex justify-center mx-auto my-5">
    <h1 className="text-center text-3xl text-meteorite font-bold my-6">Loading</h1>
    <div className="animate-spin ml-6 mt-7 inline-block size-6 border-[3px] border-current border-t-transparent text-meteorite rounded-full" role="status" aria-label="loading">   </div>
    </div>
    </div>
      {isError && <ErrorModal setIsErrorModalOpen={setIsError} message="Loading took too long. Click the button to redirect to the homepage, or close to try again." showRedirectButton={true} />}
    </div>
  );
}

export default Loading

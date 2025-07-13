import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import api from '../../api/api';

interface CreateNewShortenProps {
    setOpen: (value: boolean) => void;
    refetch: () => void;
}

interface UrlFormData {
    originalUrl: string;
}

const CreateNewShorten: React.FC<CreateNewShortenProps> = ({ setOpen, refetch }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UrlFormData>({
        defaultValues: {
            originalUrl: '',
        },
        mode: 'onTouched',
    });

    const createShortUrlHandler: SubmitHandler<UrlFormData> = async (formData) => {
        setLoading(true);
        try {
            const { data: res } = await api.post('/shorten', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            console.log(res);

            const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${res.shortUrl}`;
            await navigator.clipboard.writeText(shortenUrl);

            toast.success('Short URL Created', {
                position: 'bottom-center',
                className: 'mb-5',
                duration: 3000,
            });

            refetch();
            reset();
            setOpen(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Create Short URL Failed', {
                position: 'bottom-center',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-white rounded-md">
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
            >
                <h1 className="font-montserrat text-center font-bold sm:text-2xl text-[22px] text-slate-800">
                    Create New Shorten Url
                </h1>

                <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

                <div>
                    <TextField
                        fullWidth
                        label="Enter URL"
                        id="originalUrl"
                        type="url"
                        placeholder="https://example.com"
                        error={!!errors.originalUrl}
                        helperText={errors.originalUrl?.message}
                        {...register('originalUrl', {
                            required: 'URL is required',
                            pattern: {
                                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                message: 'Enter a valid URL',
                            },
                        })}
                    />
                </div>

                <button
                    className="bg-customRed font-semibold text-white w-32 bg-custom-gradient py-2 transition-colors rounded-md my-3"
                    type="submit"
                >
                    {loading ? 'Loading...' : 'Create'}
                </button>

                {!loading && (
                    <Tooltip title="Close">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="absolute right-2 top-2"
                        >
                            <RxCross2 className="text-slate-800 text-3xl" />
                        </button>
                    </Tooltip>
                )}
            </form>
        </div>
    );
};

export default CreateNewShorten;

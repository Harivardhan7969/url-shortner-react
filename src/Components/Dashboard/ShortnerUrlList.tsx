import React from 'react';
import ShortenItem from './ShortenItem';

interface ShortenUrl {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt?: string;
    [key: string]: any; // Allow other fields
}

interface Props {
    data: ShortenUrl[];
}

const ShortenUrlList: React.FC<Props> = ({ data }) => {
    console.log(data);

    return (
        <div className="my-6 space-y-4">
            {data?.map((item) => (
                <ShortenItem
                    key={item.id}
                    {...item}
                />
            ))}
        </div>
    );
};

export default ShortenUrlList;

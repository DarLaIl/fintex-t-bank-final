'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserAvatar } from '../../../lib/api';
import type { AvatarProps } from '../../../types/types';

export const Avatar: React.FC<AvatarProps> = ({ user, cookieValue }) => {
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

    useEffect(() => {
        const loadAvatar = async () => {
            try {
                const avatar = await getUserAvatar(cookieValue);
                if (avatar) {
                    setAvatarSrc(avatar);
                }
            } catch (err) {
                console.error('Fetching failed:', err);
            }
        };
        loadAvatar();
    }, [user, cookieValue]);

    return (
        <div>
            {avatarSrc && (
                <Image
                    src={avatarSrc}
                    width={100}
                    height={100}
                    alt="User avatar"
                />
            )}
        </div>
    );
};

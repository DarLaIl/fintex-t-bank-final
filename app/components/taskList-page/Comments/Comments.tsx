import React, { useState, useEffect } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import {
    getEventComments,
    createNewComment,
    deleteComment,
    getAllUser,
} from '../../../lib/api';
import type { User, Comment, CommentsProps } from '../../../types/types';
import styles from './Comments.module.css';

export const Comments: React.FC<CommentsProps> = ({ eventId, cookieValue }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const eventComments = await getEventComments(
                    cookieValue,
                    eventId
                );
                setComments(eventComments);
                const allUsers = await getAllUser(cookieValue);
                setAllUsers(allUsers);
            } catch (err) {
                console.error('Error fetching comments or users:', err);
            }
        };
        fetchComments();
    }, [eventId, cookieValue]);

    const getAuthorName = (authorId: number): string => {
        const user = allUsers.find((user) => user.id === authorId);
        return user ? user.name : 'Неизвестный пользователь';
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            return;
        }

        try {
            const addedComment = await createNewComment(
                cookieValue,
                eventId,
                newComment
            );
            setComments([...comments, addedComment]);
            setNewComment('');
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    const deleteCommentClickHandler = async (commentId: number | undefined) => {
        try {
            await deleteComment(cookieValue, commentId);
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    return (
        <div className={styles.formInner}>
            <p>
                <b>Комментарии:</b>
            </p>
            <ul className={styles.lists}>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <b>{getAuthorName(comment.author)}:</b> {comment.text}
                        <button
                            className={styles.deleteButton}
                            onClick={() =>
                                deleteCommentClickHandler(comment.id)
                            }
                        >
                            <FcFullTrash />
                        </button>
                    </li>
                ))}
            </ul>
            {!comments.length && (
                <p>
                    <i>Комментариев пока нет</i>
                </p>
            )}
            <p>Добавить комментарий:</p>
            <textarea
                value={newComment}
                placeholder="Сообщение..."
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
            ></textarea>
            <button className={styles.addButton} onClick={handleAddComment}>
                Добавить
            </button>
        </div>
    );
};

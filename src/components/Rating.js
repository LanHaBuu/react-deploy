import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

function Rating({ rating, onClick }) {
    return (
        <>
            {[...Array(5)].map((item, i) => (
                <span key={i} onClick={() => onClick(i)}>
                    {rating > i ? (
                        <AiFillStar fontSize='2rem' />
                    ) : (
                        <AiOutlineStar fontSize='2rem' />
                    )}
                </span>
            ))}
        </>
    );
}

export default Rating;
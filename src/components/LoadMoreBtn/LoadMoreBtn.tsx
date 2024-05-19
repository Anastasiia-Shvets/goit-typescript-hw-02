type Props = {
    onLoadeMore: () => void;
    disabled: boolean;
}

const LoadMoreBtn = ({ onLoadeMore }: Props) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={onLoadeMore}>Load more</button>
        </div>
    );
};

export default LoadMoreBtn;
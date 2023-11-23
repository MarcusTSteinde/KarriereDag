import Link from 'next/link';
import '../styles/gamedone.css';

const GameOverPage: React.FC = () => {
    return (
        <main>
            <img src="/gameover.svg" alt="" />
            <div className='buttonbox'>
                <div className='seeresultsbutton'>
                    <Link href="/highscores" style={{ textDecoration: 'none' }}>
                        <p className="text-blue-500 hover:underline cursor-pointer">See Results</p>
                    </Link>
                </div>
                <div className='homebutton'>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <p className="text-blue-500 hover:underline cursor-pointer">Home Page</p>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default GameOverPage;
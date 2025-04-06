import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import styles from './races.module.css';
import { gon, lyn, jin, yun } from '../../lib/raceImages.js';
import { IoMale } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

import image1 from '../../assets/races/race_expanded_top_gon_hover.png';
import image2 from '../../assets/races/race_expanded_top_lyn_hover.png';
import image3 from '../../assets/races/race_expanded_top_yun_hover.png';
import image4 from '../../assets/races/race_expanded_top_jin_hover.png';



const Races = () => {
    const mainRef = useRef(null);
    const gonRef = useRef(null);
    const lynRef = useRef(null);
    const yunRef = useRef(null);
    const jinRef = useRef(null);
    const location = useLocation();

    const races = [gon, lyn, yun, jin];
    const [currentGender, setCurrentGender] = useState('male');

    const handleMaleClick = () => {
        setCurrentGender('male');
    };

    const handleFemaleClick = () => {
        setCurrentGender('female');
    };


    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash]);


    return (
        <div className={styles.racesContainer}>
            <section id='main' className={styles.mainSection}>
                <div className={styles.text}>
                    <h1>Races</h1>
                    <p>In the community of martial artists, there are four races:</p>
                    <p>
                        the deliberate Gon, the mischevious Lyn, the elegant Yun, and the industrious Jin</p>
                </div>
                <div className={styles.imageContainer}>
                    <Link to="#Gon">
                        <img src={image1} alt="About" />
                        <p>Gon</p>
                    </Link>
                    <Link to="#Lyn">
                        <img src={image2} alt="Lyn" />
                        <p>Lyn</p>
                    </Link>
                    <Link to="#Yun">
                        <img src={image3} alt="Yun" />
                        <p>Yun</p>
                    </Link>
                    <Link to="#Jin">
                        <img src={image4} alt="Jin" />
                        <p>Jin</p>
                    </Link>
                </div>
            </section>

            <section ref={gon} id="Gon" className={styles.section}>
                <div className={styles.image}>
                    <img src={gon[currentGender]} />
                </div>
                <div className={styles.description}>
                    <h1>Gon</h1>

                    <p>The Gon believe that their ancestors were born from the breath of Dragons and they embrace this legend with pride.</p>

                    <p>Physical power and combative skill are treasured among the Gon. They seek to make themselves strong, capable, and able to overcome any challenge, and use their might for the good of others. This can make Gon somewhat easy to trick, as the greedy use the Gon's intimidating physique and trusting nature for personal gain. However, if you are true, friendships established with Gon are as strong as steel and you would have earned their loyalty for life.</p>

                    <p>In their day to day lives, Gon move and speak at a calm and measured pace. This deliberate pacing was started to help nullify the other Gon trait: their famously short tempers. With their massive frame and incredible strength, little can stand in the way of these mighty people once a Gon has been moved to anger.</p>

                    <p>Available Classes: <i>Destroyer, Kung Fu Master, Force Master, Soul Fighter, Warden</i></p>
                    <div className={styles.buttons}>
                        <span onClick={handleMaleClick}><IoMale />Male</span>
                        <span onClick={handleFemaleClick}><IoFemale />Female</span>
                    </div>
                    <span className={styles.upArrow}><Link to='#main'><FaRegArrowAltCircleUp size={50} /></Link></span>
                </div>
            </section>

            <section ref={lyn} id="Lyn" className={styles.section}>
                <div className={styles.image}>
                    <img src={lyn[currentGender]} />
                </div>
                <div className={styles.description}>
                    <h1>Lyn</h1>

                    <p>The Lyn, with their large ears and dainty tails, are descendants from the Kirin, legendary animals that were both mischievous and unpredictable</p>

                    <p>The Lyn have not survived in this dangerous world by mere chance; they have innately acute senses which steer them clear from danger and allow them to see treachery and deception where others cannot. More famously, the Lyn use these highly attuned senses to converse with beings from the Spirit Realm granting them the ability to commune with Familiars and harness the power of the earth.</p>

                    <p>The Lyn are known for their somewhat unpredictable nature. During a single conversation, it is not unusual for a Lyn to convey a multitude of emotions, including hatred, fear, jealousy, love, and respect.</p>

                    <p>Available Classes: <i>Summoner, Force Master, Blade Dancer, Warlock, Gunslinger, Warden, Astromancer</i></p>
                    <div className={styles.buttons}>
                        <span onClick={handleMaleClick}><IoMale />Male</span>
                        <span onClick={handleFemaleClick}><IoFemale />Female</span>
                    </div>
                    <span className={styles.upArrow}><Link to='#main'><FaRegArrowAltCircleUp size={50} /></Link></span>
                </div>
            </section>

            <section ref={yun} id="Yun" className={styles.section}>
                <div className={styles.image}>
                    <img src={yun[currentGender]} />
                </div>
                <div className={styles.description}>
                    <h1>Yun</h1>

                    <p>The Yun are a purely female race intrinsically entwined to the natural world. The planet serves as a guide for all Yun: they are heavily attuned to the rhythms of nature and dance to its tempo.</p>

                    <p>The Funghuang, a mythical Asian bird, has passed her traits of elegance and grace to her descendants. The Yun's innate aesthetic skills make them some of the best artisans in all the realm. Other races look to them as the pinnacle of artistic skill and creativity, as the Yun weave beauty into everything they do. The Yun have become increasingly involved in modern society as they look to restore balance to the world.</p>

                    <p>Dignity is key to the Yun, and while they are able combatants, they balance their time spent fighting by teaching and meditating with others.</p>

                    <p>Available Classes: <i>Force Master, Blade Master, Dual Blade, Kung Fu Master, Soul Fighter, Gunslinger, Zen Archer</i></p>
                    <div className={styles.buttons}>
                        <span onClick={handleFemaleClick}><IoFemale />Female</span>
                    </div>
                    <span className={styles.upArrow}><Link to='#main'><FaRegArrowAltCircleUp size={50} /></Link></span>
                </div>
            </section>

            <section ref={jin} id="Jin" className={styles.section}>
                <div className={styles.image}>
                    <img src={yun[currentGender]} />
                </div>
                <div className={styles.description}>
                    <h1>Jin</h1>

                    <p>The word "Jin" means "Unyielding Effort" in the ancient language of the eastern continent. It is this characteristic that still defines the Jin people, who make up most of the world's most celebrated people.</p>

                    <p>Jin warriors may look fairly ordinary, and are certainly smaller than their Gon counterparts, but beneath a somewhat plain exterior lays incredible strength and tenacity, typical of the heirs of the Black Tortoise. Their versatility and never-say-die attitude gives Jin warriors a reputation that few would risk testing in the battlefield.</p>

                    <p>Jin people are often friendly and considerate with a strong notion of right and wrong. Their warriors are often found traveling the continents, helping the needy by working selflessly wherever they were needed.</p>

                    <p>Available Classes: <i>Assassin, Blade Master, Dual Blade, Kung Fu Master, Warlock, Gunslinger, Warden, Zen Archer</i></p>
                    <div className={styles.buttons}>
                        <span onClick={handleMaleClick}><IoMale />Male</span>
                        <span onClick={handleFemaleClick}><IoFemale />Female</span>
                    </div>
                    <span className={styles.upArrow}><Link to='#main'><FaRegArrowAltCircleUp size={50} /></Link></span>
                </div>
            </section>


        </div>
    );
};

export default Races;
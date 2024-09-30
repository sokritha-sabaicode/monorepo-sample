
'use client'
import React, { useState } from 'react';
import HeaderBasic from '@/components/cv-rating-card/router-page/basic/header-basic'
import { Sheet } from 'react-modal-sheet';
import { FaCheckCircle } from 'react-icons/fa';



const SelfDescription: React.FC = () => {
    const [strength, setStrength] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [selectedRecommendation, setSelectedRecommendation] = useState('');

    const recommendations = [
        'I am a keen, hard working, reliable and excellent time keeper.',
        'I have strong communication skills and work well in a team.',
        'I am highly motivated and always eager to learn new skills.',
    ];

    const handleOptionClick = (option: string) => {
        setSelectedRecommendation(option);
    };

    const handleSelectButtonClick = () => {
        setStrength(selectedRecommendation);
        setOpen(false);
    };

    return (
        <div>
            <HeaderBasic title='Self Descriptions' />
            <div className=" p-5 font-sans">
                <div className=" mb-4">
                    <input
                        type="text"
                        className="w-full p-7 mb-4 border rounded-3xl shadow-md"
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                        placeholder="Introduce your strengths in one sentence"
                    />
                    <button
                        className="text-yellow-500  w-full flex justify-end"
                        onClick={() => setOpen(true)}
                    >
                        Show Recommendation
                    </button>
                    <div className="p-4 border rounded-3xl mt-4 shadow-md">
                        <p className="text-gray-500">Describe about yourself</p>
                        <p className="text-gray-400">You can write something more about yourself.</p>
                    </div>
                </div>

                <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[500, 100, 400, 0]}>
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content>
                            {isOpen && (
                                <div>
                                    <div className="overflow-y-auto">
                                        {recommendations.map((rec, index) => (
                                            <div key={index}>
                                                <p className="absolute ml-6 mt-[-9px] text-xs text-gray-400 bg-white">
                                                    Introduce your strengths in one sentence
                                                </p>
                                                <div
                                                    className={`flex m-auto w-96 p-5 mb-10 border rounded-3xl shadow-md cursor-pointer xl:w-full xl:left-0 xl:p-7 }`}
                                                    onClick={() => handleOptionClick(rec)}
                                                >
                                                    <div className="flex justify-between items-center ">
                                                        <span>{rec}</span>
                                                        {selectedRecommendation === rec && (
                                                            <span className=" absolute right-4 mt-10"
                                                            >
                                                                <div className="text-orange-500 text-xl">
                                                                    <FaCheckCircle />
                                                                </div>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className={`w-96 absolute left-1 ${selectedRecommendation ? 'bg-[#FF7F00]' : 'bg-[#FBC79A]'
                                            } text-white p-2 rounded-2xl xl:w-full xl:left-0`}

                                        onClick={handleSelectButtonClick}
                                    >
                                        Select
                                    </button>
                                </div>
                            )}
                        </Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop />
                </Sheet>
            </div>
        </div>
    );
};

export default SelfDescription;

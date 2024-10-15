import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-black py-6 md:py-10 h-[50vh] md:h-[70vh] w-full">
            <div className="flex flex-col justify-between px-4 h-full">
                <div className="flex flex-col items-center md:flex-row justify-between mb-6 w-full">
                    <div className="flex space-x-4 mb-4 opacity-95 md:mb-0">
                        <a href="https://www.instagram.com/wearecherrypick/" target="_blank" rel="noopener noreferrer" className="footer_social-logo">
                            <img src="https://cdn.prod.website-files.com/655f7c1f9e1f15060121e2d5/6562092343c436614fdb98fa_iconmonstr-instagram-11%201.svg" alt="Instagram" loading="lazy" />
                        </a>
                        <a href="https://www.facebook.com/wearecherrypick/" target="_blank" rel="noopener noreferrer" className="footer_social-logo">
                            <img src="https://cdn.prod.website-files.com/655f7c1f9e1f15060121e2d5/65620923e46c4adf3c77693d_iconmonstr-facebook-1%20(1)%201.svg" alt="Facebook" loading="lazy" />
                        </a>
                        <a href="https://twitter.com/wearecherrypick" target="_blank" rel="noopener noreferrer" className="footer_social-logo">
                            <img src="https://cdn.prod.website-files.com/655f7c1f9e1f15060121e2d5/656209237688a3e4769ebc4e_iconmonstr-twitter-1%20(1)%201.svg" alt="Twitter" loading="lazy" />
                        </a>
                    </div>

                    <div className="flex flex-col text-lg text-primary md:flex-row space-y-2 md:space-y-0 md:space-x-8 w-full">
                        <a href="https://cherrypick.bloggi.co/" className="footer_link">Blog</a>
                        <a href="/team" className="footer_link">Team</a>
                        <a href="https://apply.workable.com/cherrypick/" target="_blank" rel="noopener noreferrer" className="footer_link">Careers</a>
                        <a href="https://drive.google.com/drive/folders/10wOL466Zqx34lQgVLxJqMtZzCCVm8vcp" target="_blank" rel="noopener noreferrer" className="footer_link">Press</a>
                        <a href="/privacy" className="footer_link">Privacy Policy</a>
                        <a href="/terms" className="footer_link">Terms + Conditions</a>
                    </div>
                </div>

                <div className="my-2 text-center font-bold text-6xl md:text-[10rem] leading-10 tracking-tight text-primary">
                    PettoSpot.
                </div>

                <div className="text-sm text-primary text-left w-full">
                    Copyright 2024 PettoSpot. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
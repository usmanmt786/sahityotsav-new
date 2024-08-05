import Constants from "@/data/constants";

const HomeAbout = ({configs}:{configs:any}) => {
    const imgUrl = configs?.aboutImage?.length>3?`${Constants.SITE_IMG_URL}${configs?.aboutImage}`:"/images/logo.svg";
    return (
        <div className="commonwidth grid lg:grid-cols-2 py-20">
            <div className="fullcenter ">
                <img src={imgUrl}
                data-aos="fade-right"
                className="w-[50vh] rounded-xl" alt="" />
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold mt-10 lg:mt-0"
                 data-aos="fade-up"
                 data-aos-delay="300"
                >About Sahityotsav</h2>
           
           <p className="text-sm text-justify"
            data-aos="fade-up"
            data-aos-delay="500"
           >
           Incepted 30 years ago in 1993, it has its commencement from the grassroot level -that is a family Sahityotsav. Crossing the levels of units,sectors, divisions,districts and 26 states in the country, it finds its actualization in the national level each year.
<br />
As a prime aim,Sahityotsav is focusing on the embellishment of the creativity of thousands and more students across the country, and now it became one of the towering figures in the realm Of cultural festivals of India.
<br />
Sahityotsav has its assets of thousands of young vibrant studentdom who have came forward to meet the need of the time in its various aspects. They are ready to question all the anti social hullabaloos using their talents like writing, drawing, criticizing... etc.
        
           </p>
               </div>
            
        </div>
    );
}

export default HomeAbout;
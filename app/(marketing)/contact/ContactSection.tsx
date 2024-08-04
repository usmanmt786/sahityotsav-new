"use client";

import { configSignal } from "@/controller/configs";
import { GoogleMapsURLToEmbedURL } from "@/functions/utils/map";
import { useSignalEffect } from "@preact/signals-react";
import { useState } from "react";
import { MdCall } from "react-icons/md";

const ContactSection = () => {

    const [configs, setConfigs] = useState<any>({});

    useSignalEffect(() => {
        setConfigs(configSignal.value);
    })


    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <section>
                <h1 className="text-3xl font-bold mb-4 border-b py-2">Contact Us</h1>
                <div className="text-xl font-thin">
                    Get connected with us
                </div>
                {configs?.contact1 &&
                    <a href={`tel:${configs?.contact1}`} className="contact">
                        <div className="contact-icon">
                            <MdCall className="text-3xl" />
                        </div>

                        {configs?.contact1}</a>}

                {configs?.contact2 &&
                    <a href={`tel:${configs?.contact2}`} className="contact">
                        <div className="contact-icon">
                            <MdCall className="text-3xl" />
                        </div>
                        {configs?.contact2}</a>}

            </section>

            <section>
                <iframe src={GoogleMapsURLToEmbedURL(configs?.venueLocation)}
                    className="w-full h-[400px] rounded-md ring-2"
                    allowFullScreen={true}
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </div>
    );
}

export default ContactSection;
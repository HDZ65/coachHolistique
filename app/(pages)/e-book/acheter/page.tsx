'use client'

import { motion, AnimatePresence } from 'framer-motion';
import Telechargement from "../components/Telechargement/Telechargement";
import Payment from '../components/Payment/Payment';
import { useState } from 'react';

export default function Page() { 
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    return (
        <AnimatePresence mode="wait">
            {paymentSuccess ? (
                <motion.div
                    key="congratulation"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className=""
                >
                    <Telechargement />
                </motion.div>
            ) : (

                <motion.div
                    
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className=""
                >
                    <Payment setPaymentSuccess={setPaymentSuccess} />
                </motion.div>

            )}
        </AnimatePresence>
    )
}
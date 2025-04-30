import React, { useEffect, useState, useRef } from 'react';

const BarberCount = () => {
    const counters = [
        { id: 'shops', start: 0, end: 20, label: 'Shops', description: 'Providing services in your area' },
        { id: 'users', start: 0, end: 50, label: 'Users', description: 'Satisfied customers' }
    ];

    const [counts, setCounts] = useState({ shops: 0, users: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleAnimation = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
            }
        };

        const observer = new IntersectionObserver(handleAnimation, {
            threshold: 0.5, // Trigger animation when 50% of the component is visible
        });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    useEffect(() => {
        if (hasAnimated) {
            counters.forEach(counter => {
                const { id, start, end } = counter;
                const duration = 2000;
                const increment = end / (duration / 100);

                let current = start;

                const updateCounter = () => {
                    current += increment;
                    if (current < end) {
                        setCounts(prevCounts => ({ ...prevCounts, [id]: Math.ceil(current) }));
                        setTimeout(updateCounter, 100);
                    } else {
                        setCounts(prevCounts => ({ ...prevCounts, [id]: end }));
                    }
                };

                updateCounter();
            });
        }
    }, [hasAnimated]);

    return (
        <section
            ref={sectionRef}
            className="py-10 bg-gray-100 sm:py-16 lg:py-24"
        >
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Numbers tell our story</h2>
                    <p className="mt-3 text-xl leading-relaxed text-gray-600 md:mt-8">Discover the numbers behind our community</p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-10 text-center lg:mt-24 sm:gap-x-8 md:grid-cols-2">
                    {counters.map(counter => (
                        <div
                            key={counter.id}
                            className={`transition-transform duration-700 ${
                                hasAnimated ? 'transform scale-100 opacity-100' : 'transform scale-90 opacity-0'
                            }`}
                        >
                            <h3 className="font-bold text-7xl">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                                    {counts[counter.id]}
                                </span>
                            </h3>
                            <p className="mt-4 text-xl font-medium text-gray-900">{counter.label}</p>
                            <p className="text-base mt-0.5 text-gray-500">{counter.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BarberCount;


 export const getDeviceDetails = (userAgent) => {
    let os = 'Unknown OS';
    let browser = 'Unknown Browser';

  
    if (userAgent.includes('Win')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('like Mac')) os = 'iOS'; 

    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        const match = userAgent.match(/Chrome\/(\d+\.\d+)/);
        browser = `Chrome v${match ? match[1] : 'Unknown'}`;
    } else if (userAgent.includes('Firefox')) {
        const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
        browser = `Firefox v${match ? match[1] : 'Unknown'}`;
    } else if (userAgent.includes('Edg')) {
        const match = userAgent.match(/Edg\/(\d+\.\d+)/);
        browser = `Edge v${match ? match[1] : 'Unknown'}`;
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        const match = userAgent.match(/Version\/(\d+\.\d+)/);
        browser = `Safari v${match ? match[1] : 'Unknown'}`;
    }

    return { os, browser, rawAgent: userAgent };
};
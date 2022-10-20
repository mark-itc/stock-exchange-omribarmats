window.onload = (e) => {
    e.preventDefault();
    getQuotes('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse/')
};


async function getQuotes(url) {
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)

        slicedResult = result.slice(0,200)
        console.log(slicedResult)
        
        slicedResult.forEach(item => {
            symbol = item.symbol;
            price = item.open;


            document.getElementById("marquee-items").innerHTML+=`<span class="marquee-item"> <b>${symbol}</b> <span class="marquee-price">${price}</span></span>` 
        });


      
    }
    catch (err) {
        throw new Error("ERROR: server error", err);
    }
}


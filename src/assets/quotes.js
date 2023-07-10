const motivationalQuotes = [
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
    ["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"],
    ["Your present circumstances don't determine where you can go; they merely determine where you start.", "Nido Qubein"],
    ["Difficulties in life are intended to make us better, not bitter.", "Dan Reeves"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.", "Helen Keller"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["It does not matter how slowly you go as long as you do not stop.", "Confucius"],
    ["Sometimes you will never know the value of a moment until it becomes a memory.", "Dr. Seuss"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"],
    ["No matter what you're going through, there's a light at the end of the tunnel.", "Demi Lovato"],
    ["The struggle you're in today is developing the strength you need for tomorrow.", "Robert Tew"],
    ["The best way out is always through.", "Robert Frost"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Your hardest times often lead to the greatest moments of your life. Keep going. Tough situations build strong people in the end.", "Roy T. Bennett"],
    ["Your time is limited, don't waste it living someone else's life.", "Steve Jobs"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["Don't be afraid to give up the good to go for the great.", "John D. Rockefeller"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["The only person you should try to be better than is the person you were yesterday.", "Matty Mullins"],
    ["It does not matter how slowly you go, as long as you do not stop.", "Confucius"],
    ["Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got this.", "Chantal Sutherland"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["The biggest adventure you can take is to live the life of your dreams.", "Oprah Winfrey"],
    ["Do what you feel in your heart to be right, for you'll be criticized anyway.", "Eleanor Roosevelt"],
    ["The past cannot be changed. The future is yet in your power.", "Unknown"],
    ["Don't let yesterday take up too much of today.", "Will Rogers"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["Set your goals high, and don't stop till you get there.", "Bo Jackson"],
    ["The best way to predict the future is to create it.", "Peter Drucker"],
    ["In the middle of every difficulty lies opportunity.", "Albert Einstein"],
    ["Your time is limited, so don't waste it living someone else's life.", "Steve Jobs"],
    ["The only place where success comes before work is in the dictionary.", "Vidal Sassoon"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson"],
    ["Success is not the absence of failure; it's the persistence through failure.", "Aisha Tyler"],
    ["Your attitude, not your aptitude, will determine your altitude.", "Zig Ziglar"],
    ["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"],
    ["The more you praise and celebrate your life, the more there is in life to celebrate.", "Oprah Winfrey"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["You don't have to be great to start, but you have to start to be great.", "Zig Ziglar"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["The difference between ordinary and extraordinary is that little extra.", "Jimmy Johnson"],
    ["Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.", "Steve Jobs"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"],
    ["Challenges are what make life interesting and overcoming them is what makes life meaningful.", "Joshua J. Marine"],
    ["It's not what happens to you, but how you react to it that matters.", "Epictetus"],
    ["The best revenge is massive success.", "Frank Sinatra"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["Life is either a daring adventure or nothing at all.", "Helen Keller"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["The best way out is always through.", "Robert Frost"],
    ["If you can dream it, you can achieve it.", "Zig Ziglar"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["It does not matter how slowly you go as long as you do not stop.", "Confucius"],
    ["Sometimes you will never know the value of a moment until it becomes a memory.", "Dr. Seuss"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"],
    ["No matter what you're going through, there's a light at the end of the tunnel.", "Demi Lovato"],
    ["The struggle you're in today is developing the strength you need for tomorrow.", "Robert Tew"],
    ["The best way out is always through.", "Robert Frost"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Your hardest times often lead to the greatest moments of your life. Keep going. Tough situations build strong people in the end.", "Roy T. Bennett"],
    ["Your time is limited, don't waste it living someone else's life.", "Steve Jobs"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["Don't be afraid to give up the good to go for the great.", "John D. Rockefeller"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["The only person you should try to be better than is the person you were yesterday.", "Matty Mullins"],
    ["It does not matter how slowly you go, as long as you do not stop.", "Confucius"],
    ["Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. You got this.", "Chantal Sutherland"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["The biggest adventure you can take is to live the life of your dreams.", "Oprah Winfrey"],
    ["Do what you feel in your heart to be right, for you'll be criticized anyway.", "Eleanor Roosevelt"],
    ["The past cannot be changed. The future is yet in your power.", "Unknown"],
    ["Don't let yesterday take up too much of today.", "Will Rogers"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["Set your goals high, and don't stop till you get there.", "Bo Jackson"],
    ["The best way to predict the future is to create it.", "Peter Drucker"],
    ["In the middle of every difficulty lies opportunity.", "Albert Einstein"],
    ["Your time is limited, so don't waste it living someone else's life.", "Steve Jobs"],
    ["The only place where success comes before work is in the dictionary.", "Vidal Sassoon"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", "Christian D. Larson"],
    ["Success is not the absence of failure; it's the persistence through failure.", "Aisha Tyler"],
    ["Your attitude, not your aptitude, will determine your altitude.", "Zig Ziglar"],
    ["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"],
    ["The more you praise and celebrate your life, the more there is in life to celebrate.", "Oprah Winfrey"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["You don't have to be great to start, but you have to start to be great.", "Zig Ziglar"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["The difference between ordinary and extraordinary is that little extra.", "Jimmy Johnson"],
    ["Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.", "Steve Jobs"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"],
    ["Challenges are what make life interesting and overcoming them is what makes life meaningful.", "Joshua J. Marine"],
    ["It's not what happens to you, but how you react to it that matters.", "Epictetus"],
    ["The best revenge is massive success.", "Frank Sinatra"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["Life is either a daring adventure or nothing at all.", "Helen Keller"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["The best way out is always through.", "Robert Frost"],
    ["If you can dream it, you can achieve it.", "Zig Ziglar"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["You are never too old to set another goal or to dream a new dream.", "C.S. Lewis"],
    ["Life is either a daring adventure or nothing at all.", "Helen Keller"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["The best way out is always through.", "Robert Frost"],
    ["If you can dream it, you can achieve it.", "Zig Ziglar"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"]
  ];

  export default motivationalQuotes;
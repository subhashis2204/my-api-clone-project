const express = require('express')
const path = require('path');
const { youtube, stackoverflow, github, googleSearch } = require('./utility');
const app = express();
const port = process.env.PORT || 3000
const results = require('./data')

require('dotenv').config({ path: './TEST.env' })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/search", async(req, res) => {
    const searchQuery = req.query.search_query

    let promises = []
    const windows = [youtube, stackoverflow, github, googleSearch]
    windows.forEach(window => {
        promises.push(window(searchQuery))
    })

    await Promise.all(promises);

    // results.youtube = [{ "id": "vLnPwxZdW4Y", "title": "C++ Tutorial for Beginners - Full Course", "time": "5 years ago", "imgUrl": "https://i.ytimg.com/vi/vLnPwxZdW4Y/mqdefault.jpg" }, { "id": "yGB9jhsEsr8", "title": "C++ Tutorial For Beginners: Learn C Plus Plus In Hindi", "time": "4 years ago", "imgUrl": "https://i.ytimg.com/vi/yGB9jhsEsr8/mqdefault.jpg" }, { "id": "8jLOx1hD3_o", "title": "C++ Programming Course - Beginner to Advanced", "time": "1 year ago", "imgUrl": "https://i.ytimg.com/vi/8jLOx1hD3_o/mqdefault.jpg" }, { "id": "ZzaPdXTrSb8", "title": "C++ Tutorial for Beginners - Learn C++ in 1 Hour", "time": "1 year ago", "imgUrl": "https://i.ytimg.com/vi/ZzaPdXTrSb8/mqdefault.jpg" }, { "id": "HME2SrWWSYk", "title": "C++ Full Course for Beginners (Hindi) | Learn Coding", "time": "2 years ago", "imgUrl": "https://i.ytimg.com/vi/HME2SrWWSYk/mqdefault.jpg" }, { "id": "-TkoO8Z07hI", "title": "C++ Tutorial: Full Course for Beginners ⚡️ (FREE)", "time": "1 year ago", "imgUrl": "https://i.ytimg.com/vi/-TkoO8Z07hI/mqdefault.jpg" }, { "id": "Umm1ZQ5ltZw", "title": "C++ Tutorial For Beginners in Hindi | C++ Programming | C++ Full Course | Great Learning", "time": "3 years ago", "imgUrl": "https://i.ytimg.com/vi/Umm1ZQ5ltZw/mqdefault.jpg" }, { "id": "oaFkaeJTiNU", "title": "How to learn C++ Programming Language with Full Information? – [Hindi] – Quick Support", "time": "1 year ago", "imgUrl": "https://i.ytimg.com/vi/oaFkaeJTiNU/mqdefault.jpg" }, { "id": "_FFRRMEXdBU", "title": "C or C++ | What coding language should you learn ?", "time": "2 years ago", "imgUrl": "https://i.ytimg.com/vi/_FFRRMEXdBU/mqdefault.jpg" }, { "id": "GOiDf1wSMts", "title": "C++ or Java | Which coding language to learn?", "time": "1 year ago", "imgUrl": "https://i.ytimg.com/vi/GOiDf1wSMts/mqdefault.jpg" }]
    // results.github = [{ "title": "grpc/grpc", "url": "https://github.com/grpc/grpc", "description": "The C based gRPC (C++, Python, Ruby, Objective-C, PHP, C#)" }, { "title": "facebook/infer", "url": "https://github.com/facebook/infer", "description": "A static analyzer for Java, C, C++, and Objective-C" }, { "title": "nothings/stb", "url": "https://github.com/nothings/stb", "description": "stb single-file public domain libraries for C/C++" }, { "title": "shadowsocks/shadowsocks-windows", "url": "https://github.com/shadowsocks/shadowsocks-windows", "description": "A C# port of shadowsocks" }, { "title": "edenhill/librdkafka", "url": "https://github.com/edenhill/librdkafka", "description": "The Apache Kafka C/C++ library" }, { "title": "nlohmann/json", "url": "https://github.com/nlohmann/json", "description": "JSON for Modern C++" }, { "title": "Light-City/CPlusPlusThings", "url": "https://github.com/Light-City/CPlusPlusThings", "description": "C++那些事" }, { "title": "msgpack/msgpack-c", "url": "https://github.com/msgpack/msgpack-c", "description": "MessagePack implementation for C and C++ / msgpack.org[C/C++]" }, { "title": "gabime/spdlog", "url": "https://github.com/gabime/spdlog", "description": "Fast C++ logging library." }, { "title": "danmar/cppcheck", "url": "https://github.com/danmar/cppcheck", "description": "static analysis of C/C++ code" }, { "title": "civetweb/civetweb", "url": "https://github.com/civetweb/civetweb", "description": "Embedded C/C++ web server" }, { "title": "Mooophy/Cpp-Primer", "url": "https://github.com/Mooophy/Cpp-Primer", "description": "C++ Primer 5 answers" }, { "title": "abseil/abseil-cpp", "url": "https://github.com/abseil/abseil-cpp", "description": "Abseil Common Libraries (C++)" }, { "title": "spmallick/learnopencv", "url": "https://github.com/spmallick/learnopencv", "description": "Learn OpenCV  : C++ and Python Examples" }, { "title": "nothings/single_file_libs", "url": "https://github.com/nothings/single_file_libs", "description": "List of single-file C/C++ libraries." }, { "title": "google/orbit", "url": "https://github.com/google/orbit", "description": "C/C++ Performance Profiler" }, { "title": "catchorg/Catch2", "url": "https://github.com/catchorg/Catch2", "description": "A modern, C++-native, test framework for unit-tests, TDD and BDD - using C++14, C++17 and later (C++11 support is in v2.x branch, and C++03 on the Catch1.x branch)" }, { "title": "GavinYellow/SharpSCADA", "url": "https://github.com/GavinYellow/SharpSCADA", "description": "C# SCADA" }, { "title": "johnezang/JSONKit", "url": "https://github.com/johnezang/JSONKit", "description": "Objective-C JSON" }, { "title": "yusugomori/DeepLearning", "url": "https://github.com/yusugomori/DeepLearning", "description": "Deep Learning (Python, C, C++, Java, Scala, Go)" }, { "title": "microsoft/msquic", "url": "https://github.com/microsoft/msquic", "description": "Cross-platform, C implementation of the IETF QUIC protocol, exposed to C, C++, C# and Rust." }, { "title": "rswier/c4", "url": "https://github.com/rswier/c4", "description": "C in four functions" }, { "title": "babaybus/DoxygenToolkit.vim", "url": "https://github.com/babaybus/DoxygenToolkit.vim", "description": "Simplify Doxygen documentation in C, C++, Python." }, { "title": "conan-io/conan", "url": "https://github.com/conan-io/conan", "description": "Conan - The open-source C/C++ package manager" }, { "title": "Unity-Technologies/UnityCsReference", "url": "https://github.com/Unity-Technologies/UnityCsReference", "description": "Unity C# reference source code." }, { "title": "changkun/modern-cpp-tutorial", "url": "https://github.com/changkun/modern-cpp-tutorial", "description": "📚 Modern C++ Tutorial: C++11/14/17/20 On the Fly | https://changkun.de/modern-cpp/" }, { "title": "PlummersSoftwareLLC/Primes", "url": "https://github.com/PlummersSoftwareLLC/Primes", "description": "Prime Number Projects in C#/C++/Python" }, { "title": "Mzzopublic/C", "url": "https://github.com/Mzzopublic/C", "description": "C语言" }, { "title": "lballabio/QuantLib", "url": "https://github.com/lballabio/QuantLib", "description": "The QuantLib C++ library" }, { "title": "fffaraz/awesome-cpp", "url": "https://github.com/fffaraz/awesome-cpp", "description": "A curated list of awesome C++ (or C) frameworks, libraries, resources, and shiny things. Inspired by awesome-... stuff." }]
    // results.stackoverflow = [{ "title": "Qt C++ receiver data to be separated by spaces", "url": "https://stackoverflow.com/questions/74226592/qt-c-receiver-data-to-be-separated-by-spaces", "tags": ["qt", "qt-creator", "qtserialport", "qtserial", "qt-connection"] }, { "title": "How do I write 3 separate assembly files to calculate the smallest number, largest number, and average number of this c++ file?", "url": "https://stackoverflow.com/questions/74242769/how-do-i-write-3-separate-assembly-files-to-calculate-the-smallest-number-large", "tags": ["c++", "assembly"] }, { "title": "How can I use a comparison function with more than 2 arguments with c++ vector?", "url": "https://stackoverflow.com/questions/74238985/how-can-i-use-a-comparison-function-with-more-than-2-arguments-with-c-vector", "tags": ["c++", "sorting", "vector"] }, { "title": "clearing the output stream c++", "url": "https://stackoverflow.com/questions/74238374/clearing-the-output-stream-c", "tags": ["c++", "linux", "bash", "terminal"] }, { "title": "C++ Locking window movement", "url": "https://stackoverflow.com/questions/74242635/c-locking-window-movement", "tags": ["c++", "winapi"] }, { "title": "Are there cases in C++ where the auto keyword can&#39;t be replaced by an explicit type?", "url": "https://stackoverflow.com/questions/74237380/are-there-cases-in-c-where-the-auto-keyword-cant-be-replaced-by-an-explicit-t", "tags": ["c++", "c++20", "variable-types"] }, { "title": "How to copy entire vector into deque using inbuilt function? (in C++)", "url": "https://stackoverflow.com/questions/74238912/how-to-copy-entire-vector-into-deque-using-inbuilt-function-in-c", "tags": ["c++", "vector", "stl", "deque"] }, { "title": "Incorrect subtraction of different type pointers in c++", "url": "https://stackoverflow.com/questions/74242231/incorrect-subtraction-of-different-type-pointers-in-c", "tags": ["c++", "stl", "iterator", "c++17"] }, { "title": "Updating the value of a variable in a for loop in C++", "url": "https://stackoverflow.com/questions/74241222/updating-the-value-of-a-variable-in-a-for-loop-in-c", "tags": ["c++", "for-loop", "nested-for-loop"] }, { "title": "How do setup Raylib with C++ on VSC", "url": "https://stackoverflow.com/questions/74242028/how-do-setup-raylib-with-c-on-vsc", "tags": ["c++", "visual-studio-code", "raylib"] }]
    // results.googleSearch = [{ "title": "Learn C++ Programming - Programiz", "url": "https://www.programiz.com/cpp-programming", "description": "C++ is a powerful general-purpose programming language. It can be used to develop operating systems, browsers, games, and so on. C++ supports different ways ..." }, { "title": "C++ - Wikipedia", "url": "https://en.wikipedia.org/wiki/C%2B%2B", "description": "C++ (pronounced \"C plus plus\") is a high-level general-purpose programming language created by Danish computer scientist Bjarne Stroustrup as an extension ..." }, { "title": "C++ Programming Language - GeeksforGeeks", "url": "https://www.geeksforgeeks.org/c-plus-plus/", "description": "29-Aug-2022 — C++ is a general-purpose programming language and is widely used nowadays for competitive programming. It has imperative, object-oriented ..." }, { "title": "C++ Language Tutorial", "url": "https://cplusplus.com/doc/tutorial/", "description": "C++ Language. These tutorials explain the C++ language from its basics up to the newest features introduced by C++11. Chapters have a practical orientation, ..." }, { "title": "C++ Tutorial | Learn C++ Programming - javatpoint", "url": "https://www.javatpoint.com/cpp-tutorial", "description": "C++ is a general purpose, case-sensitive, free-form programming language that supports object-oriented, procedural and generic programming. C++ is a middle- ..." }, { "title": "C++ Tutorial - Tutorialspoint", "url": "https://www.tutorialspoint.com/cplusplus/index.htm", "description": "C++ is a middle-level programming language developed by Bjarne Stroustrup starting in 1979 at Bell Labs. C++ runs on a variety of platforms, such as Windows ..." }, { "title": "Standard C++", "url": "https://isocpp.org/", "description": "The home of Standard C++ on the web — news, status and discussion about the C++ standard on all compilers and platforms. Recent HighlightsNews RSS · improving- ..." }, { "title": "Online C++ Compiler - online editor", "url": "https://www.onlinegdb.com/online_c++_compiler", "description": "OnlineGDB is online IDE with C++ compiler. Quick and easy way to compiler c++ program online. It supports g++ compiler for c++." }]

    // res.send(results);

    res.render('results', { results })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
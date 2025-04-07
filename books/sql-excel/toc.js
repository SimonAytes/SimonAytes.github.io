// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="index.html"><strong aria-hidden="true">1.</strong> 소개</a></li><li class="chapter-item expanded "><a href="chapter1.html"><strong aria-hidden="true">2.</strong> &quot;데이터&quot;란 무엇인가?</a></li><li class="chapter-item expanded "><a href="chapter2.html"><strong aria-hidden="true">3.</strong> 파일 형식 이해하기</a></li><li class="chapter-item expanded "><a href="chapter3.html"><strong aria-hidden="true">4.</strong> 워크북에서 데이터베이스로: 시트를 넘어서 생각하기</a></li><li class="chapter-item expanded "><a href="chapter4.html"><strong aria-hidden="true">5.</strong> 데이터베이스란 무엇인가?</a></li><li class="chapter-item expanded "><a href="chapter5.html"><strong aria-hidden="true">6.</strong> 데이터베이스의 강점은 무엇인가?</a></li><li class="chapter-item expanded "><a href="chapter6.html"><strong aria-hidden="true">7.</strong> 관계형 데이터베이스 101</a></li><li class="chapter-item expanded "><a href="chapter7.html"><strong aria-hidden="true">8.</strong> SQL vs. Python vs. Excel – 차이점은 무엇인가?</a></li><li class="chapter-item expanded "><a href="chapter8.html"><strong aria-hidden="true">9.</strong> SQL 소개</a></li><li class="chapter-item expanded "><a href="chapter9.html"><strong aria-hidden="true">10.</strong> 첫 번째 SQL 쿼리 작성하기 (엑셀 예제 포함)</a></li><li class="chapter-item expanded "><a href="chapter10.html"><strong aria-hidden="true">11.</strong> 대시보드란 무엇인가?</a></li><li class="chapter-item expanded "><a href="chapter11.html"><strong aria-hidden="true">12.</strong> 데이터 분석 도구 살펴보기</a></li><li class="chapter-item expanded "><a href="chapter12.html"><strong aria-hidden="true">13.</strong> 흩어진 점들을 연결하기</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);

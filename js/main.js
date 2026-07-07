(function(){
  var fadeEls=document.querySelectorAll('.fade-in');
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}})
  },{threshold:0.12});
  fadeEls.forEach(function(el){obs.observe(el)});
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>20)});
  var btn=document.getElementById('navBtn');
  var links=document.getElementById('navLinks');
  if(btn&&links){btn.addEventListener('click',function(){links.classList.toggle('open')});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open')})})}
  var counters=document.querySelectorAll('.stat-count');
  if(counters.length){var co=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){var el=e.target,target=parseInt(el.dataset.target,10),c=0,step=Math.ceil(target/40);
      var t=setInterval(function(){c+=step;if(c>=target){el.textContent=target;clearInterval(t)}else{el.textContent=c}},25);co.unobserve(el)}})
  },{threshold:0.5});counters.forEach(function(el){co.observe(el)})}
  document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-68,behavior:'smooth'})}})})
})();

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Editor_1._0.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Web;

namespace Editor_1._0.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        GalleryContext db;

        public HomeController(ILogger<HomeController> logger, GalleryContext context)
        {
            _logger = logger;
            db = context;
        }



        public IActionResult Index()
        {
            if (Request.Cookies.ContainsKey("CurError"))
            {
                ViewData["CurError"] = Request.Cookies["CurError"];
                Response.Cookies.Delete("CurError");
            }

            ViewBag.curPage = "Home/Index";
            // Воссоздание редактируемой сейчас картинки 
            Picture p = new Picture();
            if (User.Identity.IsAuthenticated)
            {
                p = db.Pictures.FirstOrDefault(u => u.Author.Mail == User.Identity.Name && u.Name == "CurrentProject");
                ViewBag.IsAuth = true;
            }
            else
            {
                p = db.Pictures.FirstOrDefault(u => u.Author.FName == "defAuthor" && u.Name == HttpContext.Connection.RemoteIpAddress.ToString());
                ViewBag.IsAuth =false;

            }
            if (p != null)
            {

                ViewBag.IsCanvSaved = true;
                ViewBag.Img = p.Image;
                ViewBag.BgColor = p.BgColor;

            }
            else
            {
                ViewBag.IsCanvSaved = false;
                ViewBag.BgColor = "white";
            }


            return View();
        }


        [HttpPost]
        public string SaveCanvState(string image, string bgColor, string imgName)
        {
            string Mail = User.Identity.Name;
            Picture p = new Picture();
             
            if (image != null)
            {
                image = image.Replace(' ', '+');
                image = image.Substring(image.IndexOf(',') + 1);
                
                byte[] imageData = Convert.FromBase64String(image);
                p.BgColor = bgColor;
                p.Image = imageData;
            }
            if (Mail != null)
            {
                if (imgName !=null)
                {
                    p.Author = db.Authors.FirstOrDefault(u => u.Mail == Mail);
                    p.Name = imgName;
                    db.Pictures.Add(p);
                }
                else { 
                Picture otherP = db.Pictures.FirstOrDefault(u => u.Author.Mail == Mail && u.Name == "CurrentProject");
                if (otherP == null)
                {
                    p.Name = "CurrentProject";
                    p.Author = db.Authors.FirstOrDefault(u => u.Mail == Mail);
                    db.Pictures.Add(p);
                }
                else
                {
                    otherP.Image = p.Image;
                    otherP.BgColor = p.BgColor;
                }
                }
            }
            else
            { 
                Picture otherP = db.Pictures.FirstOrDefault(u => u.Author.FName == "defAuthor" &&
                u.Name == HttpContext.Connection.RemoteIpAddress.ToString());
                if (otherP == null)
                {
                    p.Name = HttpContext.Connection.RemoteIpAddress.ToString();
                    p.Author = db.Authors.First(u => u.FName == "defAuthor");
                    db.Pictures.Add(p);
                }
                else
                {
                    otherP.Image = p.Image;
                    otherP.BgColor = p.BgColor;
                }
                if (imgName != null)
                {
                    return "nonauth";
                }
            }
 
            db.SaveChanges();

            return "good";
        }

        
        public IActionResult Gallery()
        {
            if (Request.Cookies.ContainsKey("CurError"))
            {
                ViewData["CurError"] = Request.Cookies["CurError"];
                Response.Cookies.Delete("CurError");
            }

            ViewBag.IsAuth = User.Identity.IsAuthenticated;
            ViewBag.curPage = "Home/Gallery";
            if (User.Identity.IsAuthenticated)
            {
                ViewBag.Pictures = db.Pictures.Where(u => u.Author.Mail == User.Identity.Name).ToArray();
            }
            else
            {
                ViewBag.Pictures = db.Pictures.Where(u => u.Author.FName == "defAuthor" &&
                u.Name == HttpContext.Connection.RemoteIpAddress.ToString()).ToArray();
            }
            return View();
        }
        
       public string DeleteImg(string imgName)
        {
           string Mail = User.Identity.Name;
           if(Mail==null)
            {
                Picture p = db.Pictures.FirstOrDefault(u=> u.Author.FName=="defAuthor"&&
                u.Name ==HttpContext.Connection.RemoteIpAddress.ToString());

                if (p != null)
                    db.Pictures.Remove(p);
            }
           else
            {
                Picture p = db.Pictures.FirstOrDefault(u => u.Author.Mail == Mail &&
                u.Name == imgName);

                if (p != null)
                    db.Pictures.Remove(p);
            }

            db.SaveChanges();
           return "good";
        }

        public string EditImg(string imgName)
        {
            string Mail = User.Identity.Name;
            
            if(Mail !=null)
            {
                Picture p = db.Pictures.FirstOrDefault(u => u.Author.Mail == Mail &&
                u.Name == imgName);
                if (p == null)
                    return ("incorrectname");
                Picture curProj = db.Pictures.FirstOrDefault(u => u.Author.Mail == Mail &&
                u.Name == "CurrentProject");
                if (curProj == null)
                {
                    curProj.Author = db.Authors.FirstOrDefault(u => u.Mail == Mail);
                    curProj.Name = "CurrentProject";
                    curProj.Image = p.Image;
                    curProj.BgColor = p.BgColor;
                    db.Pictures.Add(curProj);
                }
                else
                {
                    curProj.Image = p.Image;
                    curProj.BgColor = p.BgColor;
                }
            }

            db.SaveChanges();
            return "good";
        }
        public IActionResult Privacy()
        {
            ViewBag.IsAuth = User.Identity.IsAuthenticated;
            ViewBag.curPage = "Home/Privacy";
            return View();
        }
     
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

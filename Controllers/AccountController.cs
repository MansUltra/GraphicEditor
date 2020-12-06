using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Editor_1._0.ViewModels;
using Editor_1._0.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Editor_1._0.Controllers
{
    public class AccountController: Controller
    {
        private GalleryContext db;
        public AccountController(GalleryContext context)
        {
            db = context;
        }
        
        
        // Откуда перешли
        private void SentFrom(string path, out string method, out string ctrl)
        {
            int IndexOfSep = path.IndexOf('/');
            ctrl = path.Substring(0, IndexOfSep);
            method = path.Substring(IndexOfSep + 1);
            switch (ctrl)
            {
                case "Home":
                    switch (method)
                    {
                        case "Index":
                            break;
                        case "Gallery":
                            break;
                        case "Privacy":
                            break;
                        default:
                            method = "Index";
                            break;
                    }
                    break;
                default:
                    method = "Index";
                    ctrl = "Home";
                    break;
                    //fj
            }
        }

        
        // Замена пользоватьской тек. ред. картинки
        private void ChangeTempPicture(Author author)
        {
            Picture p = db.Pictures.FirstOrDefault(u => u.Author.Mail == author.Mail && u.Name == "CurrentProject");
            if (p == null)
            {
                p = db.Pictures.FirstOrDefault(u => u.Author.FName == "defAuthor" &&
                u.Name == HttpContext.Connection.RemoteIpAddress.ToString());
                if (p != null)
                {
                    p.Author = author;
                    p.Name = "CurrentProject";
                }
            }
            else
            {
                Picture otherP = db.Pictures.FirstOrDefault(u => u.Author.FName == "defAuthor" &&
                u.Name == HttpContext.Connection.RemoteIpAddress.ToString());
                p.Image = otherP.Image;
                p.BgColor = otherP.BgColor;
            }
            db.SaveChanges();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model, string sent_from)
        {

            // Проверка имя пользвателя пароль
            if (ModelState.IsValid)
            {
                Author user = await db.Authors.FirstOrDefaultAsync(u => u.Mail == model.Mail && u.Password == model.Password);
                if (user != null)
                {
                    // Correct Pair Loging-Password 
                    await Authenticate(model.Mail); 
                    ViewData["Mail"] = model.Mail;

                    ChangeTempPicture(user);

                }
               else
                   Response.Cookies.Append("CurError", "Некорректные логин и(или) пароль");
            }
            else
                Response.Cookies.Append("CurError", "Некорректные логин и(или) пароль");

            string prevMethod, prevController;
            SentFrom(sent_from, out prevMethod,out prevController);
            return RedirectToAction(prevMethod,prevController);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterModel model,string sent_from)
        {
            if (ModelState.IsValid)
            {
                Author user = await db.Authors.FirstOrDefaultAsync(u => u.Mail == model.Mail);
                if (user == null)
                { 
                    db.Authors.Add(new Author { FName = model.Fname, SName = model.Sname, Age = model.Age, Mail = model.Mail, Password = model.Password });
                    await db.SaveChangesAsync();
                    await Authenticate(model.Mail); // аутентификация

                    ChangeTempPicture(user);
                }
                else
                    Response.Cookies.Append("CurError", "Уже есть такая почта");

            }
            else
                Response.Cookies.Append("CurError", "Некорректные данные");

            string prevMethod, prevController;
            SentFrom(sent_from, out prevMethod, out prevController);
            return RedirectToAction(prevMethod, prevController);
        }
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index","Home");
        }
        private async Task Authenticate(string userName)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}

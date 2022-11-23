using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Restaurant.Models.Function;
using Restaurant.Models;
using Restaurant.Controllers.Client;
using Restaurant.Controllers.Manager;
using Restaurant.Controllers.Cashier;
using Restaurant.Controllers.Receptionist;
using Restaurant.Controllers.Waiter;
using Restaurant.Models.Security;

namespace Restaurant.Controllers.Login
{
    public class LoginController : Controller
    {
        // GET: Login
        //[AllowAnonymous]
        public ActionResult Index(string ReturnUrl)
        {
            ViewBag.ReturnUrl = ReturnUrl;
            return View();
        }

        // GET: /Login/

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Index(account model, string ReturnUrl)
        {
            if (String.IsNullOrEmpty(model.UserName))
            {
                ModelState.AddModelError("", "Chưa nhập tên đăng nhập");
                return View("Index", model);
            }
            if (String.IsNullOrEmpty(model.Password))
            {
                ModelState.AddModelError("", "Chưa nhập mật khẩu");
                return View("Index", model);
            }

            var acc = new NguoiDungF().Login(model.UserName, model.Password);
            if (acc == null)
            {
                ModelState.AddModelError("", "Người dùng không tồn tại");
                return View("Index", model);
            }
            else
            {
                Session["Login"] = acc;
                if (string.IsNullOrEmpty(ReturnUrl) && acc.Roles.Contains("Thu ngân ") == true)
                {
                    return RedirectToAction("Index", "Cashier_Home");
                }
                if (string.IsNullOrEmpty(ReturnUrl) && acc.Roles.Contains("Quản lý") == true)
                {
                    return RedirectToAction("Index", "Manager_Home");
                }
                if(string.IsNullOrEmpty(ReturnUrl) && acc.Roles.Contains("Tiếp tân") == true)
                {
                    return RedirectToAction("Index", "Receptionist_Home");
                }
                if (string.IsNullOrEmpty(ReturnUrl) && acc.Roles.Contains("Nhân viên phục vụ") == true)
                {
                    return RedirectToAction("DanhSach", "Waiter_Home");
                }
                else return RedirectToAction("Index", "Login");

            }


        }
    }
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const methodOverride = require('method-override')
const sequelize = require('./configs/db.config')

//sequelize.sync({ alter: true })
const indexRouter = require('./routes/index.route')
const authRouter = require('./routes/auth.route')
const registerRouter = require('./routes/register.route')
const userRouter = require('./routes/pages/user.route')
const categoryRouter = require('./routes/pages/category.route')
const authorRouter = require('./routes/pages/author.route')
const bookRouter = require('./routes/pages/book.route')
const searchRouter = require('./routes/pages/search.route')
const dashboardRouter = require('./routes/dashboard/index.route')
const dashboardUserRouter = require('./routes/dashboard/user.route')
const dashboardRoleRouter = require('./routes/dashboard/role.route')
const dashboardPermissionRouter = require('./routes/dashboard/permission.route')
const dashboardAuthorRouter = require('./routes/dashboard/author.route')
const dashboardCategoryRouter = require('./routes/dashboard/category.route')
const dashboardBookRouter = require('./routes/dashboard/book.route')
const dashboardLendingBookRouter = require('./routes/dashboard/lending_book.route')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      //secure: true,
      httpOnly: true,
      sameSite: true
    }
}))
app.use(passport.session())
app.use(flash())
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  res.locals.user = req.user ? req.user : null
  next()
})
app.use('/', indexRouter)
app.use('/', authRouter)
app.use('/register', registerRouter)
app.use('/profile', userRouter)
app.use('/category', categoryRouter)
app.use('/author', authorRouter)
app.use('/book', bookRouter)
app.use('/search', searchRouter)
app.use('/dashboard', dashboardRouter)
app.use('/dashboard/account/user', dashboardUserRouter)
app.use('/dashboard/account/role', dashboardRoleRouter)
app.use('/dashboard/account/permission', dashboardPermissionRouter)
app.use('/dashboard/book/author', dashboardAuthorRouter)
app.use('/dashboard/book/category', dashboardCategoryRouter)
app.use('/dashboard/book/book', dashboardBookRouter)
app.use('/dashboard/lending_book', dashboardLendingBookRouter)

app.listen(process.env.PORT)
drop table if exists [user];
drop table if exists coffeeDate;

create table [user] (   
    username    NVARCHAR(20),
    [password]    NVARCHAR(20),
    primary key (username)
);

create table coffeeDate (
    [date]      DATE,
    [time]      TIME,
    venue       NVARCHAR(50),
    primary key ([date], [Time], venue)
);
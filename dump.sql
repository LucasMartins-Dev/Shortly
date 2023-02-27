--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    "Idsessions" integer NOT NULL,
    token text NOT NULL,
    "user" text NOT NULL,
    "createdAt" text NOT NULL
);


--
-- Name: sessions_Idsessions_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."sessions_Idsessions_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_Idsessions_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."sessions_Idsessions_seq" OWNED BY public.sessions."Idsessions";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "IdUsuario" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "confirmPassword" text NOT NULL,
    "createdAt" text NOT NULL
);


--
-- Name: users_IdUsuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_IdUsuario_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_IdUsuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_IdUsuario_seq" OWNED BY public.users."IdUsuario";


--
-- Name: sessions Idsessions; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN "Idsessions" SET DEFAULT nextval('public."sessions_Idsessions_seq"'::regclass);


--
-- Name: users IdUsuario; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "IdUsuario" SET DEFAULT nextval('public."users_IdUsuario_seq"'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: sessions_Idsessions_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."sessions_Idsessions_seq"', 1, false);


--
-- Name: users_IdUsuario_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_IdUsuario_seq"', 1, false);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY ("Idsessions");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("IdUsuario");


--
-- PostgreSQL database dump complete
--


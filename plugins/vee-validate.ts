import { defineRule, configure, Form, Field, ErrorMessage } from "vee-validate"
import * as rules from "@vee-validate/rules"

export default defineNuxtPlugin((nuxtApp) => {

    Object.keys(rules.all)
    .filter((a) => a !== "default")
    .forEach((rule) => {
        const ruleOption: any = rules
        defineRule(rule, ruleOption[rule])
    })

    configure({
        generateMessage: (context) => {
            switch (context.rule?.name) {
                case "required":
                    return `Oops ${context.field} is required!`
                default: 
                    return `${context.field} is invalid`
            }
        }
    })
})
